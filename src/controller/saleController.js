const SaleService = require('../service/SaleService');
const AppError = require('../utils/AppError');
class SaleController {

    static async createSale(req, res, next) {
        try {

            const {
                shiftId,
                clientId,
                totalOrder,
                paymentMethodId,
                suborders
            } = req.body

            const { userId } = req;

            const saleRecord = await SaleService.createSale(
                shiftId,
                clientId,
                userId,
                totalOrder,
                paymentMethodId,
                suborders
            );

            if (!saleRecord) {
                throw new AppError("Error creating sale register, aborted", 500);
            }
            return res.status(201).json(saleRecord);

        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const { userId } = req;
            const { initialDate, endDate, shiftId } = req.query;


            if (!shiftId && !initialDate && !endDate) {
                throw new AppError("Filter paramethers are missing", 400);
            }

            console.log(`Index paramthers controller: initialDate : ${initialDate} endDate: ${endDate}, shiftId: ${shiftId },` );

            if (!userId) {
                throw new AppError("Required field missing", 400);
            }
            const orders = await SaleService.index(userId, shiftId, initialDate, endDate);

            if (!orders) {
                throw new AppError("Sales not found", 404);
            }
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            console.log('SaleController: method show called');
            const { userId } = req;
            const { saleId } = req.params

            if (!userId) {
                throw new AppError("Required field is missing", 400);
            }
            if (!saleId || isNaN(parseInt(saleId))) {
                throw new AppError("field mismatch data", 400);
            }
            const sale = await SaleService.show(saleId, userId);
            if (!sale) {
                throw new AppError("Sale not found", 404);
            }
            return res.status(200).json(sale);
        } catch (error) {
            next(error);
        }
    }

    static async productSaleRanking(req, res, next) {
        try {
            const saleRanking = await SaleService.productSaleRanking();
            return res.status(200).json(saleRanking);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = SaleController;
