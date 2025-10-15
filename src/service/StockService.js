
const sequelize = require('../database/connection');
const { Stock } = require('../model/StockModel');
const { StockTransaction } = require('../model/StockTransactionModel');
const EStockTransactionType  = require('../model/enums/StockTransactionType');
const EStockRerefenceType = require('../model/enums/StockReferenceType');
const StockAdjustment = require('../model/StockAdjustmentModel');
const StockReferenceType = require('../model/StockReferenceTypeModel');



class StockService {
    //IMPLEMENTAR AJUSTE
    static async adjustStock(userId, productId, qtyChange, reason) {
        const referenceTypeId = qtyChange > 0 ? EStockRerefenceType.ADJ_UP : EStockRerefenceType.ADJ_DOW;

        const adjustment = await StockAdjustment.create({
            productId,
            userId,
            qtyChange,
            reason,
            referenceCode: referenceTypeId
        }, { transaction: t });
    }

    // insert items into stock
    static async createPurchase(userId, productId, qtyChange) {

        return await sequelize.transaction(async (t) => {
            
            const stock = await Stock.findOne({ where: { product_id: productId } });

            if (!stock) {
                throw new Error('Stock not found');
            }

            const oldQty = stock.qty;
            const oldAvg = stock.avgPrice

            let newAvg = oldAvg;

            if (qtyChange > 0) {
                newAvg = (oldQty * oldAvg + qtyChange * unityCost) / (oldQty + qtyChange);
            }

            await stock.update({
                qty: oldQty + qtyChange,
                avgPrice: newAvg,
            }, {
                transaction: t
            });

            await StockTransaction.create({
                productId,
                qtyChange,
                unityCost,
                typeId: EStockTransactionType.PURCHASE,
                // NAO EXISTE AINDA
                referenceTypeId,
                // REFERENCIA TABELA DE COMPRAS
                referenceId: adjustment.id,
            }, {
                transaction: t
            });

        });
    }
}


module.exports = StockService;