
const sequelize = require('../database/connection');
const Stock = require('../model/StockModel');
const StockTransaction = require('../model/StockTransactionModel');
const EStockTransactionType = require('../model/enums/StockTransactionType');
const EStockRerefenceType = require('../model/enums/StockReferenceType');
const StockAdjustment = require('../model/StockAdjustmentModel');
const PurchaseLine = require('../model/PurchaseLineModel');
const PurchaseOrder = require('../model/PurchaseOrderModel');



class StockService {
    //IMPLEMENTAR AJUSTE
    static async adjustStock(userId, productId, qtyChange, reason) {

        const referenceTypeId = qtyChange > 0 ? EStockRerefenceType.ADJ_UP : EStockRerefenceType.ADJ_DOW;

        sequelize.transaction(async (t) => {

            const adjustment = await StockAdjustment.create({
                productId,
                userId,
                qtyChange,
                reason,
                referenceCode: referenceTypeId
            }, { transaction: t });

        })

    }

    static async createPurchase(userId, productId, providerId, invoiceNumber, total, products) {

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
}


module.exports = StockService;

