const sequelize = require('../database/connection');

const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const PaymentMethod = require('../model/PaymentMethod');
const Shift = require('../model/ShiftModel');
const ShiftTransctionType = require('../model/ShiftTransactionType');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const ShiftWithdraw = require('../model/ShiftWithdrawModel');
const ShiftDeposit = require('../model/ShiftDepositModel');
const Suborder = require('../model/SuborderModel');
const Product = require('../model/ProductModel');
const Stock = require('../model/StockModel');
const StockTransaction = require('../model/StockTransactionModel');


//IMPLEMENTAR O CANCELAMENTO E DEVOLUCAO DA VENDA
// STOCK
// SHIFT






class ShiftTransactionController {
//  !!!!!!!!!!!!!   IMPLEMENTAR IDEMPOTENCIA  !!!!!!!!!!!!!!!!!
    async createSaleTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }

        try {

           const result = await sequelize.transaction(async (t) => {
                const order = await Order.create(req.body, {
                    include: [{
                        model: Suborder,
                        as: 'suborders'
                    }],
                    transaction: t
                });

                if (!order) {
                    return res.status(400).json({ msg: "Error creating new order: Operation aborted" });
                }

                const shiftTransaction = {
                    // order must have a field shiftId todo:implement it
                    shiftId: 2,
                    amount: order.totalOrder,
                    userId: order.userId,
                    transactionTypeId: 1,// SALE 
                    paymentMethodId: order.paymentMethodId,
                    orderId: order.id
                }

                const transactionCreated = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                if (!transactionCreated) {
                    return res.status(400).json({ msg: "Error creating transaction: Aborted" });
                }


                const { suborders } = req.body;

                for (let { productId, qtt, productPrice } of suborders) {
                    await Stock.decrement('qty', {
                        by: qtt,
                        where: { productId: productId },
                        transaction: t
                    });

                    await StockTransaction.create({
                        productId: productId,
                        qtyChange: qtt,
                        unityCost: productPrice,
                        typeId: 1,
                        referenceTypeId: 1,
                        referenceId: order.id
                    });
                }

                return {order, shiftTransaction};
            });

            res.status(201).json({ order: result.order, transaction: ShiftTransactionController.filterNullFields(result.shiftTransaction) });

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }


    async createWithdrawTransaction(req, res) {
        //implementing security checks

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }

        try {

            await sequelize.transaction(async (t) => {

                const withdraw = await ShiftWithdraw.create(req.body, { transaction: t });

                if (!withdraw) {
                    return res.status(400).json({ msg: "error creating withdraw" });
                }
                // ajustar aqui, esta uma bosta
                const shiftWithdraw = {
                    shiftId: 1,
                    amount: withdraw.amount,
                    userId: withdraw.userId,
                    transactionTypeId: 3,// SALE 
                    paymentMethodId: 2,
                    withdrawId: withdraw.id
                }


                const withdrawRegister = await ShiftTransaction.create(shiftWithdraw, { transaction: t });


                if (!withdrawRegister) {
                    return res.status(401).json({ msg: "error creating withdraw record" });
                }

                return res.status(201).json(ShiftTransactionController.filterNullFields(withdrawRegister));

            });


        } catch (error) {
            console.log(error);
            res.status(402).json({ msg: "error creating withdraw register : aborted catch block" });
        }

    }


    async createDepositTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }

        try {

            await sequelize.transaction(async (t) => {

                const deposit = await ShiftDeposit.create(req.body, { transaction: t });

                if (!deposit) {
                    return res.status(400).json({ msg: "error creating withdraw" });
                }


                // using destructuring
                // const { amount , userId, depositId } = deposit;
                // const shiftRecord = { amount , userId, depositId }

                const shiftDeposit = {
                    shiftId: 1,
                    amount: deposit.amount,
                    userId: deposit.userId,
                    transactionTypeId: 2,// SALE 
                    paymentMethodId: 2,
                    depositId: deposit.id
                }


                const depositRegister = await ShiftTransaction.create(shiftDeposit, { transaction: t });


                if (!depositRegister) {
                    return res.status(401).json({ msg: error.message });
                }

                return res.status(201).json(ShiftTransactionController.filterNullFields(depositRegister));

            });


        } catch (error) {
            console.log(error);
            res.status(402).json({ msg: error.message });
        }

    }

    async index(req, res) {

        const { shiftId } = req.body;

        try {

            const transactions = await ShiftTransaction.findAll({
                where: { shiftId },
                attributes: ['id', 'shiftId', 'amount'],
                include: [{
                    model: User,
                    attributes: ['id', 'name'],
                    as: 'user'
                }, {
                    model: ShiftTransctionType,
                    attributes: ['name'],
                    as: 'type'
                }, {
                    model: PaymentMethod,
                    attributes: ['name'],
                    as: 'payment'
                }, {
                    model: Order,
                    as: 'order',
                    attributes: ['id', 'clientId', 'totalOrder'],
                    include: [{
                        model: Suborder,
                        as: 'suborders',
                        attributes: ['qtt', 'total'],
                        include: [{
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'price']
                        }]
                    }]
                }

                ]
            });

            return res.status(200).json(transactions);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
        }

    }


    static filterNullFields(obj) {

        if (typeof obj.toJSON === "function") {
            obj = obj.toJSON();
        }

        return Object.keys(obj).reduce((accumulator, key) => {
            const value = obj[key];
            if (value !== null && value !== undefined) {
                accumulator[key] = value;
            }
            return accumulator;
        }, {});
    }
}

module.exports = new ShiftTransactionController();