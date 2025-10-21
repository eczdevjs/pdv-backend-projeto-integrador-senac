
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

class StockService {

    static async createAdjustment(userId, productId, qtyChange, reason) {

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
    }


    static async createPurchase(userId, providerId, invoiceNumber, total, products) {

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

                await this.stockPurchaseRecord(userId, productId, qty, unityCost, id, t);
            }
            return purchase;
        });

        return response;
    }


    static async stockPurchaseRecord(userId, productId, qty, unityCost, purchaseLineId, transaction) {

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
    }


    // [] Further: get rid of loops to create each line register, perfect scenario is building a query and send it to database once. (Loop can be kept, it is not desirable for connecting each time into database)

    // stock must not get negative


    static async createTransference(fromStoreId, toStoreId, userId, reason, products) {

        const result = await sequelize.transaction(async (t) => {

            const stockTransfer = await StockTransfer.create({ fromStoreId, toStoreId, userId, reason }, { transaction: t, returning: ['id', 'from_store_id', 'to_store_id', 'user_id', 'reason', 'created_at', 'updated_at'] });

            for (let { productId, qty } of products) {

                const product = await Stock.findOne({ where: { productId }, transaction: t });

                if (!product) {
                    throw new Error('Stock update : Product not found');
                }

                const unityCost = product.avgCost

                const result = await product.increment('qty', {
                    by: qty, returning: true,
                    transaction: t
                });

                const dataValuesUpdated = result.dataValues;

                if ((result._previousDataValues.qty + qty) != dataValuesUpdated.qty) {
                    throw new Error("Error updating transference values: Operation aborted");
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
            return stockTransfer;
        });
        return result;
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

            if (!list) {
                return new Error('It wasn\'t possible reach resources (stock list): Aborted ')
            }

            return list;
        } catch (error) {
            console.log(error);
            return new Error("Error: ", error.message);
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
                return new Error("Product not found");
            }

            return stock;

        } catch (error) {
            console.log(error);
            return new Error("Error: ", error.message);
        }
    }


    static async transactionsByDay(day) {

        try {

            const startOfDay = new Date(`${day}T00:00:00`);
            const endOfDay = new Date(`${day}T23:59:59`);

            const transactions = await StockTransaction.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startOfDay, endOfDay]
                    }
                },
                attributes: ['id', 'qtyChange','referenceId', 'createdAt'],

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
                    attributes: ['code'],
                    as: 'referenceType'
                }
               ]

            });

            if (!transactions) {
                return new Error("Stock transactions not found");
            }

            return transactions;

        } catch (error) {
            console.log(error);
        }
    }


    static async transactionsBetweenTwoDates(start, end) {

        try {

            const startDate = new Date(`${start}T00:00:00`);
            const endDate = new Date(`${end}T23:59:59`);

            const transactions = await StockTransaction.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                attributes: ['id', 'qtyChange','referenceId', 'createdAt'],

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
                    attributes: ['code'],
                    as: 'referenceType'
                }
               ]

            });

            if (!transactions) {
                return new Error("Stock transactions not found");
            }

            return transactions;

        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = StockService;

