const StockService = require('../service/StockService');



class StockController {
    //IMPLEMENTING IDEMPOTENCY
    // change store to purchase
    // purchase purchaseline must be implemented before
    async purchase(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: 'body requisition is required' });
        }

        try {

            const { userId,productId, providerId, invoiceNumber, total, products } = req.body;

            // const { products } = req.body;
            // nao estou retornando nada no metodo createPurchase, mesmo com sucesso 
            const register = await StockService.createPurchase(userId,productId, providerId, invoiceNumber, total, products);

            if (!register) {
                return res.status(404).json({ msg: 'Error creating stock register: Operation aborted' });
            }
            return res.status(201).json(register);
        } catch (error) {
            console.log(error)
            return res.json(error);
        }

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