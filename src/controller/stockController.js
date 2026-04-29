const StockService = require('../service/StockService');
const AppError = require('../utils/AppError');

class StockController {
    //IDEMPOTENCY
    static async purchase(req, res, next) {

        try {
            const userId = req.userId;
            const {  providerId, invoiceNumber, total, products } = req.body;
            const register = await StockService.createPurchase(userId, providerId, invoiceNumber, total, products);
            if (!register) {
                throw new AppError("Error creating store register, aborted", 500);
            }
            return res.status(201).json(register);
        } catch (error) {
            next(error);
        }
    }
    //INDEMPOTENCY
    static async adjustment(req, res, next) {
        // check received values,  define strategy route, params or body
        try {
            const userId = req.userId;
            const {  qtyChange, reason, productId } = req.body;
            const adjObject = await StockService.createAdjustment(
                userId,
                productId,
                qtyChange,
                reason
            );

            if (!adjObject) {
                throw new AppError("Error creating adjustment, aborted", 500);
            }

            return  res.status(201).json(adjObject);

        } catch (error) {
            next(error);
        }
    }

    static async transference(req, res, next) {

        try {
            const { fromStoreId, toStoreId, userId, reason, products } = req.body;
            const transferObject = await StockService.createTransference(
                fromStoreId,
                toStoreId,
                userId,
                reason,
                products
            );
            if (!transferObject) {
                throw new AppError("Error creating transfer register, aborted", 500);
            }
            return res.status(201).json(transferObject);
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const list = await StockService.index();
            if (!list) {
                throw new AppError("Error fetching store data, aborted", 500);
            }

            if(list.length === 0){
                return   res.status(404).json({msg: 'Stock list is empty'});
            }
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            const productId = req.params.id;
            if (!productId) {
                throw new AppError("Product id is required, it's missing, aborted", 500);
            }
            const stock = await StockService.show(productId);
            if (!stock) {
                throw new AppError("Product not found", 404);
            }
            return res.status(200).json(stock);
        } catch (error) {
            next(error);
        }
    }


    static async transactionsByDay(req, res, next) {

        try {
            const { date } = req.params;
            if (!date) {
                throw new AppError("Day field is missing", 400);
            }
            const transactions = await StockService.transactionsByDay(date);
            if (!transactions) {
                throw new AppError("Transactions not found", 404);
            }
            return res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }

    static async transactionsBetweenTwoDates(req, res, next) {
        console.log('TRANSACTIONBETWEENDATES CALLED !!!!!!!!!!!!!!!!!!!!!');
        try {
            const {initialDate, endDate } = req.query;
            console.log('PARAMS')
            console.log(req.params);
            console.log("initial and end: =",initialDate,'|', endDate);
            if (!initialDate || !endDate) {
                throw new AppError("required fields (date) missing", 500);
            }

            const transactions = await StockService.transactionsBetweenTwoDates(initialDate, endDate);

            if (!transactions) {
                throw new AppError("Transactions not found", 404);
            }
            return res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports =  StockController;