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


class ShiftTransactionController {

    async createSaleTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }

        try {

            await sequelize.transaction(async (t) => {
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
                    shiftId: 1,
                    amount: order.totalOrder,
                    userId: order.userId,
                    transactionTypeId: 1,// SALE 
                    paymentMethodId: order.paymentMethodId,
                    orderId: order.id
                }

                const transactionCreated = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                if (!transactionCreated) {
                    return res.status(400).json({ msg: "Error creating transaction" });
                }

                res.status(201).json({ order, transaction: ShiftTransactionController.filterNullFields(shiftTransaction) });

            });

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }


    async createDepositTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }
        // i need to grant all fields were provided

        // at least userId and opening Balance must be provided;
        // if (Object.keys(req.body).length < 2) {
        //     return res.status(400).json({ msg: "Operation can not be perfomed: information is missing" })
        // }
        // // check if fields are right, think about it


        // // fields are required and can not be null
        // for (let key in req.body) {
        //     if (!req.body[key]) {
        //         return res.status(400).json({ msg: "Operation can not be perfomed: fields can not be null" });
        //     }
        // }


        try {

            const shiftTransaction = await ShiftTransaction.create(req.body);

            console.log('shiftTransaction return: ', shiftTransaction)

            if (!shiftTransaction) {
                return res.status(401).json({ msg: "error creating shift" });
            }

            // const shiftFiltered = {
            //     id: shift.id,
            //     userId: shift.userId,
            //     startTime: shift.startTime,
            //     openingBalance: shift.openingBalance
            // };

            return res.status(201).json(shiftTransaction);

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }

    async createWithdrawTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }
        // i need to grant all fields were provided

        // at least userId and opening Balance must be provided;
        // if (Object.keys(req.body).length < 2) {
        //     return res.status(400).json({ msg: "Operation can not be perfomed: information is missing" })
        // }
        // // check if fields are right, think about it


        // // fields are required and can not be null
        // for (let key in req.body) {
        //     if (!req.body[key]) {
        //         return res.status(400).json({ msg: "Operation can not be perfomed: fields can not be null" });
        //     }
        // }


        try {

            const shiftTransaction = await ShiftTransaction.create(req.body);

            console.log('shiftTransaction return: ', shiftTransaction)

            if (!shiftTransaction) {
                return res.status(401).json({ msg: "error creating shift" });
            }

            // const shiftFiltered = {
            //     id: shift.id,
            //     userId: shift.userId,
            //     startTime: shift.startTime,
            //     openingBalance: shift.openingBalance
            // };

            return res.status(201).json(this.filterNullFields(shiftTransaction));

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }



    static filterNullFields(obj) {
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