const StockService = require('../service/StockService');



class StockController {
    
   //IMPLEMENTING IDEMPOTENCY
    async purchase(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: 'body requisition is required' });
        }

        try {

            const { userId, providerId, invoiceNumber, total, products } = req.body;

            const register = await StockService.createPurchase(userId, providerId, invoiceNumber, total, products);

            if (!register) {
                return res.status(404).json({ msg: 'Error creating stock register: Operation aborted' });
            }
            return res.status(201).json(register);
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error creating purchase register operation aborted'});
        }

    }

    //IMPLEMENTING INDEMPOTENCY
    async adjustment(req, res) {
        // check received values,  define strategy route, params or body
        const { userId, qtyChange, reason, productId } = req.body;

        try {

            const adjObject = await StockService.adjustStock(
                userId,
                productId,
                qtyChange,
                reason
            );

            if (adjObject) {
                return res.status(201).json(adjObject);
            } else {
                return res.status(400).json({msg: "Error during adjustment , operation aborted"});
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'error creating adjustment' })
        }
    }

    async transference(req, res) {

    }
}

module.exports = new StockController;