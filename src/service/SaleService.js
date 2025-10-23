const sequelize = require('../database/connection')
const StockService = require('../service/StockService');
const Order = require('../model/OrderModel');
const Suborder = require('../model/SuborderModel');
const ShiftTransactionTypeEnum = require('../model/enums/ShiftTransactionTypeEnum');
const StockTransaction = require('../model/StockTransactionModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const EStockRerefenceType = require('../model/enums/StockReferenceType');
const EStockTransactionType = require('../model/enums/StockTransactionType');

const Stock = require('../model/StockModel');

class SaleService {

    static async createSale(shiftId, clientId, userId, totalOrder, paymentMethodId, suborders) {

        const result = await sequelize.transaction(async (t) => {

            const order = await Order.create({
                clientId,
                userId,
                totalOrder,
                paymentMethodId,
                suborders
            }, {
                include: [{
                    model: Suborder,
                    as: 'suborders'
                }],
                transaction: t
            });

            if (!order) {
                throw new Error("Error creating new order: Aborted");
            }

            const shiftTransaction = {
                shiftId,
                amount: totalOrder,
                userId,
                transactionTypeId: ShiftTransactionTypeEnum.SALE,
                paymentMethodId,
                orderId: order.id
            };

            console.log("shiftTransactionObject =====>>",shiftTransaction)

            const transactionCreated = await ShiftTransaction.create(shiftTransaction, { transaction: t});

            if (!transactionCreated) {
                throw new Error("Error creating transaction register: Aborted");
            }

            for (let { productId, qtt, productPrice } of suborders) {
                await Stock.decrement('qty', {
                    by: qtt,
                    where: { productId: productId },
                    transaction: t
                });

                await StockTransaction.create({
                    userId,
                    productId: productId,
                    qtyChange: qtt,
                    unityCost: productPrice,
                    typeId: EStockTransactionType.OUT_SALE,
                    referenceTypeId: EStockRerefenceType.SALE,
                    referenceId: order.id
                }, {transaction:t});
            }
            return {order, shiftTransaction};
        });
        return result;
    }

    static async dailySales(shiftId) {
        

    }

    static async filterSalesByDate(begin, end){

    }

    static async updateSale() {

    }

    static async createRefund() {

    }

}


module.exports = SaleService;