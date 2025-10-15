const StockService = require('../service/StockService');



class StockController {
    //IMPLEMENTING IDEMPOTENCY
    // change store to purchase
    // purchase purchaseline must be implemented before
    async purchase(req, res) {
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
        const { userId, qtyChange, reason, productId } = req.body;

        try {

            await StockService.adjustStock(
                userId,
                productId,
                qtyChange,
            );

            return res.status(201).json({ msg: 'Stock updated succesfuly' });

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'error creating adjustment' })
        }
    }

    async transference(req, res) {

    }
}

module.exports = new StockController;