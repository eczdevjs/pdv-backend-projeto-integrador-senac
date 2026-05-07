
const sequelize = require('../database/connection');
const Stock = require('../model/StockModel');
const StockTransaction = require('../model/StockTransactionModel');
const EStockRerefenceType = require('../model/enums/StockReferenceType');
const EStockTransactionType = require('../model/enums/StockTransactionType');
const StockAdjustment = require('../model/StockAdjustmentModel');
const PurchaseLine = require('../model/PurchaseLineModel');
const PurchaseOrder = require('../model/PurchaseOrderModel');
const StockTransfer = require('../model/StockTransferModel');
const StockTransferLine = require('../model/StockTransferLineModel');
const Product = require('../model/ProductModel');
const User = require('../model/UserModel');
const { Op } = require('sequelize');
const StockReferenceType = require('../model/StockReferenceTypeModel');
const AppError = require('../utils/AppError');


class StockService {

    static async createPurchase(userId, providerId, invoiceNumber, total, products) {
        try {

            const response = await sequelize.transaction(async (t) => {

                const purchase = await PurchaseOrder.create({ userId, providerId, invoiceNumber, total }, { transaction: t });

                const purchaseId = purchase.id;

                for (let { productId, qty, unityCost } of products) {

                    const { id } = await PurchaseLine.create({
                        purchaseId,
                        productId,
                        qty,
                        unityCost
                    }, {
                        transaction: t
                    });

                    await this.#stockPurchaseRecord(userId, productId, qty, unityCost, id, t);
                }
                return purchase;
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    static async createAdjustment(userId, productId, qtyChange, reason) {
        try {
            let referenceTypeId = qtyChange > 0 ? EStockTransactionType.ADJ_UP : EStockTransactionType.ADJ_DOWN;

            const response = sequelize.transaction(async (t) => {

                const [rows] = await Stock.increment('qty', {
                    by: qtyChange,
                    where: { productId },
                    transaction: t,
                    returning: true,
                });

                const updated = {
                    newQty: rows[0][0].qty
                };

                const adjustment = await StockAdjustment.create({
                    productId,
                    userId,
                    qtyChange,
                    reason,
                    referenceCode: referenceTypeId
                }, { transaction: t });

                const stockunityCost = await Stock.findOne({
                    where: { productId },
                    attributes: ['avgCost'],
                    transaction: t
                });

                await StockTransaction.create({
                    userId,
                    productId,
                    qtyChange,
                    unityCost: stockunityCost.avgCost,
                    typeId: referenceTypeId,
                    referenceTypeId: EStockRerefenceType.ADJUSTMENT,
                    referenceId: adjustment.id
                }, { transaction: t });

                return updated;
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    // [] Further: get rid of loops to create each line register, perfect scenario is building a query and send it to database once. (Loop can be kept, it is not wishable for connecting each time into database)

    // stock must not get negative

    static async createTransference(fromStoreId, toStoreId, userId, reason, products) {

        try {
            const result = await sequelize.transaction(async (t) => {

                const stockTransfer = await StockTransfer.create({ fromStoreId, toStoreId, userId, reason }, { transaction: t, returning: ['id', 'from_store_id', 'to_store_id', 'user_id', 'reason', 'created_at', 'updated_at'] });

                for (let { productId, qty } of products) {

                    const product = await Stock.findOne({ where: { productId }, transaction: t });

                    if (!product) {
                        throw new AppError('Stock update : Product not found', 404);
                    }

                    const unityCost = product.avgCost

                    const result = await product.increment('qty', {
                        by: qty, returning: true,
                        transaction: t
                    });

                    const dataValuesUpdated = result.dataValues;

                    if ((result._previousDataValues.qty + qty) != dataValuesUpdated.qty) {
                        throw new AppError("Error updating transference values: Operation aborted", 500);
                    }

                    const transferLine = await StockTransferLine.create({
                        transferId: stockTransfer.id,
                        productId,
                        qty,
                        unityCost,
                    }, { transaction: t });

                    let typeId = qty > 0 ? EStockTransactionType.IN_TRANSFER : EStockTransactionType.OUT_TRANSFER;

                    await StockTransaction.create({
                        userId,
                        productId,
                        qtyChange: qty,
                        unityCost,
                        typeId,
                        referenceTypeId: EStockRerefenceType.TRANSFER,
                        referenceId: transferLine.id
                    }, { transaction: t });

                }

                if (!stockTransfer) {
                    throw new AppError("Error creating transfer register, aborted", 500);
                }
                return stockTransfer;
            });
            return result;
        } catch (error) {
            throw error;
        }
    }


    static async index() {
        try {

            const list = await Stock.findAll({
                attributes: ['qty'],
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'brand', 'description', 'price'],
                    as: 'product'
                }]
            });

            return list;
        } catch (error) {
            throw error;
        }
    }


    static async show(productId) {
        try {
            const stock = await Stock.findOne({
                where: { productId },
                attributes: ['qty'],
                include: [{
                    model: Product,
                    attributes: [
                        'id', 'name', 'brand', 'description', 'price'],
                    as: 'product'
                }]
            });

            if (!stock) {
                throw new AppError("Product not found", 404);
            }

            return stock;

        } catch (error) {
            throw error;
        }
    }


    static async transactions(start, end, type) {
        try {
            const where = {};
            const startDate = new Date(`${start}T00:00:00`);
            const endDate = new Date(`${end}T23:59:59`);

            where.createdAt = {
                [Op.between]: [startDate, endDate]
            }

            if (type) {
                where.referenceTypeId = type;
            } else {
                where.referenceTypeId = [2, 3, 4, 5];
            }

            const transactions = await StockTransaction.findAll({
                where,
                attributes: ['id', 'qtyChange', 'referenceId', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['name'],
                    as: 'user'
                },
                {
                    model: Product,
                    attributes: ['name'],
                    as: 'product'
                },
                {
                    model: StockReferenceType,
                    attributes: ['id', 'code'],
                    as: 'referenceType'
                }],
                order: [['createdAt', 'DESC']]
            });

            return transactions;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async #stockPurchaseRecord(userId, productId, qty, unityCost, purchaseLineId, transaction) {
        try {

            const stock = await Stock.findOne({ where: { productId } });

            if (!stock) {

                const register = await Stock.create({ productId, qty, avgCost: unityCost });

                const stockTransaction = await StockTransaction.create({
                    userId,
                    productId,
                    qtyChange: qty,
                    unityCost,
                    typeId: EStockTransactionType.IN_PURCHASE,
                    referenceTypeId: EStockRerefenceType.PURCHASE,
                    referenceId: purchaseLineId
                }, {
                    transaction
                });

                return { register, stockTransaction };
            }

            const oldQty = stock.qty;
            const oldAvg = stock.avgPrice

            let newAvg = oldAvg;

            if (qty > 0) {
                newAvg = (oldQty * oldAvg + qty * unityCost) / (oldQty + qty);
            }

            await stock.update({
                qty: oldQty + qty,
                avgPrice: newAvg,
            }, {
                transaction
            });

            await StockTransaction.create({
                userId,
                productId,
                qtyChange: qty,
                unityCost,
                typeId: EStockTransactionType.IN_PURCHASE,
                referenceTypeId: EStockRerefenceType.PURCHASE,
                referenceId: purchaseLineId
            }, {
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StockService;

