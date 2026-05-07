const StockService = require('../service/StockService');
const AppError = require('../utils/AppError');

class StockController {
    //IDEMPOTENCY
    static async purchase(req, res, next) {

        try {
            const userId = req.userId;
            const {  providerId, invoiceNumber, total, products } = req.body;

            if(!providerId || !invoiceNumber || !total || !products){
                throw new AppError("Required fields is missing check inputs and try  again", 400);
            }
            // checar inputs
            console.log("PRODUCTS FOR PURCHASING: ", products);
            const register = await StockService.createPurchase(userId, providerId, invoiceNumber, total, products);
    
            return res.status(201).json(register);
        } catch (error) {
            next(error);
        }
    }
    
    //INDEMPOTENCY
    static async adjustment(req, res, next) {
     
        try {
            const  userId = req.userId;
            const {productId} = req.params;
            const {qtyChange, reason} = req.body;

            if(!productId || !qtyChange || !reason || !userId) throw new AppError('Required field is missing', 400);

            if(typeof qtyChange != 'number') throw new AppError("Quantity change must be a number");

            const adjObject = await StockService.createAdjustment(
                userId,
                productId,
                qtyChange,
                reason
            );

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
            
            return res.status(201).json(transferObject);
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {

            const list = await StockService.index();
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            const productId = req.params.productId;

            if (!productId) {
                throw new AppError("Product id is required, it's missing, aborted", 500);
            }

            const stock = await StockService.show(productId);

            return res.status(200).json(stock);
        } catch (error) {
            next(error);
        }
    }


    static async transactions(req, res, next) {
       
        try {
            const {initialDate, endDate, type } = req.query;
            console.log('PARAMS')
            console.log(req.params);
            console.log("initial and end: =",initialDate,'|', endDate);
            if (!initialDate || !endDate) {
                throw new AppError("required fields (dates) missing", 400);
            }

            const transactions = await StockService.transactions(initialDate, endDate, type);

            return res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports =  StockController;