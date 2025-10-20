
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

            return { updated };
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

    // implement it further, dependos on Stores, 
    // problems to solve
    // [] it must have some reference to current store. it is nos supposed to allow a transference register for stores that is not related to current store. 

    // [] it must have any garantee that stock was updated correctly. I'am stuck into it now

    // [] Further: get rid of loops to create each line register, perfect scenario is mount a query and send it to database once. (Loop can be kept, it is  wisheble for connect each time into database)

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

                const result = await product.increment('qty', { by: qty })

                // const affectedRows = Array.isArray(result) ? result[0] : result;

                // // if (affectedRows !== 1) {
                // //     throw new Error("Error updating stock quantity: aborted = " + affectedRows);
                // // }

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
}

module.exports = StockService;

