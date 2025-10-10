const sequelize = require('../database/connection');

const StockTransaction = require('../model/StockTransactionModel');
const Stock = require('../model/StockModel');
const EStockTransactionType = require('../model/enums/StockTransactionType');
const EStockReferenceType = require('../model/enums/StockReferenceType')
const StockAdjustment = require('../model/StockAdjustmentModel');



class StockTransactionController {
    //IMPLEMENTING IDEMPOTENCY
    async store(req, res) {
        if (!req.body) {
            return res.status(400).json({ msg: 'body requisition is required' });
        }

        const register = await Stock.create(req.body);

        if (!register) {
            return res.status(404).json({ msg: 'Error creating stock register: Operation aborted' });
        }

        return res.status(201).json(register);
    }

    //IMPLEMENTING INDEMPOTENCY
    async adjustment(req, res) {
        // check received values,  define strategy route, params or body
        const { userId, qtyChange, reason, productId, productPrice } = req.body;

        try {

            await sequelize.transaction(async (t) => {

                await Stock.increment('qty', { by: qtyChange, where: { productId }, transaction: t });

                const { id } = await StockAdjustment.create({ productId, userId, qtyChange, reason, referenceCode: EStockReferenceType.ADJUSTMENT }, { transaction: t });

                let typeId = qtyChange > 0 ? EStockTransactionType.ADJ_UP : EStockTransactionType.ADJ_DOWN;

                const stock = await Stock.findByPk(productId);

                await StockTransaction.create({
                    userId,
                    productId,
                    qtyChange,
                    unityCost: stock.avgCost,
                    typeId,
                    referenceTypeId: EStockReferenceType.ADJUSTMENT,
                    referenceId: id
                }, { transaction: t });
            });

            return res.status(201).json({ msg: 'Stock updated succesfuly' });

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'error creating adjustment' })
        }
    }

    async purchase(req, res){
        
    }
}

module.exports = new StockTransactionController;