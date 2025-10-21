const StockTransaction = require('../model/StockTransactionModel');
const StockService = require('../service/StockService');


class StockController {

    //IDEMPOTENCY
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
            return res.json({ msg: 'Error creating purchase register operation aborted' });
        }

    }


    //INDEMPOTENCY
    async adjustment(req, res) {
        // check received values,  define strategy route, params or body
        const { userId, qtyChange, reason, productId } = req.body;

        try {

            const adjObject = await StockService.createAdjustment(
                userId,
                productId,
                qtyChange,
                reason
            );

            if (adjObject) {
                return res.status(201).json(adjObject);
            } else {
                return res.status(400).json({ msg: "Error during adjustment , operation aborted" });
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'error creating adjustment' })
        }
    }


    async transference(req, res) {

        const { fromStoreId, toStoreId, userId, reason, products } = req.body;

        try {

            const transferObject = await StockService.createTransference(
                fromStoreId,
                toStoreId,
                userId,
                reason,
                products
            );

            if (transferObject) {
                return res.status(201).json(transferObject);
            } else {
                return res.status(400).json({ msg: "Error transference register , operation aborted" });
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'error creating transference' })
        }
    }


    async index(req, res) {
        try {
            const list = await StockService.index();

            if (!list) {
                return res.status(500).json({ msg: 'Error fetching stock list' });
            }

            return res.status(200).json(list);
        } catch (error) {
            console.log(error);
        }
    }


    async show(req, res) {

        try {

            const productId = req.params.id;
            if (!productId) {
                return res.status(400).json({ msg: "Product id is missing" });
            }
            const stock = await StockService.show(productId);

            if (!stock) {
                return res.status(404).json({ msg: 'Product stock not found' });
            }

            return res.status(200).json(stock);

        } catch (error) {
            console.log(error);
            return new Error("Error: ", error.message);
        }
    }


    async transactionsByDay(req, res) {

        try {
            const { day } = req.body;
            if (!day) {
                return res.status(400).json({ msg: 'date filter is missing' });

            }

            const transactions = await StockService.transactionsByDay(day);

            if (!transactions) {
                return res.status(404).json({ msg: 'transactions not found' });
            }

            return res.status(200).json(transactions);

        } catch (error) {
            console.log(error);
            return new Error("Error: ", error.message);
        }
    }

    async transactionsBetweenTwoDates(req, res) {

        try {
            const { start, end } = req.body;
            if (!start || !end) {
                return res.status(400).json({ msg: 'date filter is missing' });
            }

            const transactions = await StockService.transactionsBetweenTwoDates(start, end);

            if (!transactions) {
                return res.status(404).json({ msg: 'transactions not found' });
            }

            return res.status(200).json(transactions);

        } catch (error) {
            console.log(error);
            return new Error("Error: ", error.message);
        }
    }




}

module.exports = new StockController();