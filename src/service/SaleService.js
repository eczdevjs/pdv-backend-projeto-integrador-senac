const sequelize = require('../database/connection')
const StockService = require('../service/StockService');
const Order = require('../model/OrderModel');
const Suborder = require('../model/SuborderModel');
const ShiftTransactionTypeEnum = require('../model/enums/ShiftTransactionTypeEnum');
const StockTransaction = require('../model/StockTransactionModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const EStockRerefenceType = require('../model/enums/StockReferenceType');
const EStockTransactionType = require('../model/enums/StockTransactionType');
const Product = require('../model/ProductModel');
const Client = require('../model/ClientModel');
const PaymentMethod = require('../model/PaymentMethod');
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

            const transactionCreated = await ShiftTransaction.create(shiftTransaction, { transaction: t });

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
                }, { transaction: t });
            }
            return { order, shiftTransaction };
        });
        return result;
    }


    static async getDailySales(shiftId, userId) {
        try {

            const transactions = await ShiftTransaction.findAll({
                where: { shiftId, userId },
                attributes: ['id'],
                include: [
                    {
                        model: Order,
                        attributes: ['id', 'totalOrder', 'createdAt'],
                        as: 'order',
                        include: [
                            {
                                model: Client,
                                attributes: ['id', 'name'],
                                as: 'client'
                            },
                            {
                                model: PaymentMethod,
                                attributes: ['id', 'name'],
                                as: 'paymentMethod'
                            },
                            {
                                model: Suborder,
                                attributes: ['productPrice', 'qtt', 'total'],
                                as: 'suborders',
                                include: [
                                    {
                                        model: Product,
                                        attributes: ['id', 'name', 'brand', 'productModel', 'description'],
                                        as: 'product'
                                    }
                                ]
                            }
                        ],
                        order: [['createdAt', 'DESC']]
                    }
                ]
            });

            if (!transactions) {
                throw new Error("Orders not found");
            }
            return transactions;

        } catch (error) {
            console.log(error);
            throw new Error("Error: ", error.message);
        }

    }


    static async getSale(id) {

        try {
            const sale = Order.findByPk(id, {
                attributes: ['id', 'totalOrder', 'createdAt'],
                include: [{
                    model: Suborder,
                    as: 'suborders',
                    attributes: ['productPrice', 'qtt', 'total'],
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'brand', 'description', 'size']
                    }]
                }]
            });

            if (!sale) {
                throw new Error('Sale not found');
            }

            return sale;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching sale');
        }
    }


    static async filterSalesByDate(begin, end) {

    }


    static async updateSale() {

    }


    static async createRefund() {

    }

}

module.exports = SaleService;