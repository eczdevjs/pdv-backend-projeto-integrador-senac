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
const CashierService = require('../service/CashierService');

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


    static async getDailySales(shiftId, userId) {
        try {

            const transactions = await ShiftTransaction.findAll({
                where: { shiftId, userId, transactionTypeId: 2 },
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
            throw new Error("Error: ", error.message);
        }

    }


    /// sendo chamado no sale do front
    static async getSale(id) {
        console.log(' %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GetSale called')
        try {
            const sale = Order.findByPk(id, {
                attributes: ['id', 'totalOrder', 'createdAt'],
                include: [{
                    model: Client,
                    attributes: ['id', 'name' , 'lastName'],
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
        // buscar vendasdentro de um periodo
    }


    static async updateSale() {
        // alterar informacoes do pedido
    }


    static async createRefund(orderId) {
        // descontar valor da venda caixa
        // adicionar produtos estoque
        // alterar status pedido para canceled
    }

}

module.exports = SaleService;