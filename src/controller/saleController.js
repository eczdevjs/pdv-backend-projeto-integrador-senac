const SaleService = require('../service/SaleService');
const AppError = require('../utils/AppError');
class SaleController {

    static async createSale(req, res, next) {
        try {
            for (let key in req.body) {
                if (!req.body[key]) {
                    return res.status(404).json({ msg: `Required field has null value: ${key} | Aborted` })
                }
            }

            const {
                shiftId,
                clientId,
                totalOrder,
                paymentMethodId,
                suborders
            } = req.body

            const { userId } = req;

            console.log('-----------------------====----------');
            console.log("Order : =", {
                shiftId,
                clientId,
                totalOrder,
                paymentMethodId,
                suborders
            });


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

    static async getDailySales(req, res, next) {
        try {
            const { userId } = req;
            const { shiftId } = req.params;
            console.log(userId, shiftId);
            if (!userId || !shiftId) {
                throw new AppError("Required field missing", 400);
            }
            const orders = await SaleService.getDailySales(shiftId, userId);

            if (!orders) {
                throw new AppError("Sales not found", 404);
            }
            return res.status(200).json({ success: true, data: orders, errors: false });
        } catch (error) {
            next(error);
        }
    }


    static async getSale(req, res, next) {
        try {
            const { id } = req.params
            if (!id || isNaN(parseInt(id))) {
                throw new AppError("field mismatch data", 500);
            }
            const sale = await SaleService.getSale(id);
            if (!sale) {
                throw new AppError("Sale not found", 404);
            }
            return res.status(200).json(sale);
        } catch (error) {
            next(error);
        }
    }

    static async filterByDate(req, res , next) {
        try {
            console.log(req.query);
            const { initialDate, finalDate } = req.query;
            const { userId } = req;
            console.log("SALE CONTROLLER: userId controller: =================== ", userId);
            console.log(initialDate, finalDate)

            if (!initialDate || !finalDate) {
                throw new AppError("Both initial date and end date must be provided", 400);
            }
            const  sales = await SaleService.filterByDate(initialDate, finalDate, userId);

            if (sales.length === 0) {
                throw new AppError("Transactions not found", 404);
            }

            return res.status(200).json(sales);

        } catch (error) {
            throw error;
        }
    }


}

module.exports = SaleController;
