const sequelize = require('../database/connection')
const { Op, fn, col, literal } = require('sequelize');

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
const CashierService = require('../service/CashierService');
const AppError = require('../utils/AppError');
const User = require('../model/UserModel');

class SaleService {

    static async createSale(shiftId, clientId, userId, totalOrder, paymentMethodId, suborders) {

        console.log('--- INICIANDO PROCESSAMENTO DE VENDA ---');
        console.log('Shift:', shiftId, 'User:', userId, 'Total:', totalOrder);
        console.log('Itens:', suborders.length);


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
            // further write a query to insert it once
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

            return order;
        });
        const updatedBalances = await CashierService.currentBalance(shiftId);
        return { result, updatedBalances };
    }

    static async show(saleId, userId) {
        try {
            const sale = Order.findOne({
                where: {
                    id: saleId,
                    userId
                },
                attributes: ['id', 'totalOrder', 'createdAt'],
                include: [{
                    model: Client,
                    attributes: ['id', 'name', 'lastName'],
                    as: 'client'
                }, {
                    model: Suborder,
                    as: 'suborders',
                    attributes: ['productPrice', 'qtt', 'total'],
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'brand', 'description', 'size']
                    }]
                }, {
                    model: PaymentMethod,
                    as: 'paymentMethod',
                    attributes: ['id', 'name']
                }, {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
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

    static async index(userId, shiftId, initialDate, endDate) {
        try {
            const where = {};

            if (!shiftId && !userId && !initialDate && !endDate) {
                throw new AppError("Filter paramethers are missing", 400);
            }

            if (shiftId && userId) {
                where.shiftId = shiftId;
                where.userId = userId;
                where.transactionTypeId = 2;
            } else {
                if (userId && initialDate && endDate) {

                    where.createdAt = {
                        [Op.between]: [
                            `${initialDate} 00:00:00`,
                            `${endDate} 23:59:59`
                        ]
                    }
                    where.userId = userId;
                    where.transactionTypeId = 2;
                }
            }

            if (Object.keys(where).length === 0) {
                throw new AppError("Required filters paramethers are missing", 400)
            }

            console.log("Where clause Service: ", where);

            const transactions = await ShiftTransaction.findAll({
                where,
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
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            if (!transactions) {
                throw new Error("Orders not found");
            }
            return transactions;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async productSaleRanking(initialDate, endDate) {
  
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = now;

            const ranking = await Product.findAll({
                attributes: [
                    'id',
                    'name',
                    [fn('SUM', col('suborders.qtt')), 'total_units'],
                    [fn('COUNT', col('suborders.product_id')), 'total_orders'],
                    [fn('SUM', col('suborders.total')), 'total_revenue']
                ],
                include: [{
                    model: Suborder,
                    as: 'suborders',
                    attributes: [],
                    required: true,
                    where: {
                        createdAt: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    }
                }],
                group: ['Product.id', 'Product.name'],
                order: [[literal('total_units'), 'DESC']],
                subQuery: false,
                limit: 10
            });
            return ranking;
        } catch (error) {
            console.log('Erro ao criar filtro mais vendidos')
            throw error;
        }

    }

}

module.exports = SaleService;