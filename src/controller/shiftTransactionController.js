const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const PaymentMethod = require('../model/PaymentMethod');
const Shift = require('../model/ShiftModel');
const ShiftTransctionType = require('../model/ShiftTransactionType');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const ShiftWithdraw = require('../model/ShiftWithdrawModel');
const ShiftDeposit = require('../model/ShiftDepositModel');



class ShiftTransactionController {

    async createSaleTransaction(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }

        try {

            const order = await Order.create(req.body);

            if(!order){
               return res.status(400).json({msg: "Error creating new order: Operation aborted"});
            }

        
            const shiftTransaction = {
                shiftId: 1,
                amount : order.totalOrder,
                userId: 1,
                transactionTypeId: 1,
                paymentMethodId: order.paymentMethodId,
                orderId: order.id
            }

            const transactionCreated = await ShiftTransaction.create(shiftTransaction);
            
            if(!transactionCreated){
                return res.status(400).json({msg: "Error creating transaction"});
            }

            res.status(201).json({order, transactionCreated});

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

            console.log('shiftTransaction return: ',shiftTransaction)

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

            console.log('shiftTransaction return: ',shiftTransaction)

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

    async createReturnTransaction(req, res) {

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

            console.log('shiftTransaction return: ',shiftTransaction)

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

    /* SHOW ALL OPERATIONS OF ONE USER : USER CAN SEE JUST SHIFT HE OWNS */


    // async index(req, res) {
    //     try {
    //         const shifts = await shift.findAll({
    //             attributes: ['id', 'totalshift', 'createdAt'],
    //             include: [{
    //                 model: Client,
    //                 as: 'client',
    //                 attributes: ['id', 'name', 'lastName']
    //             }, {
    //                 model: User,
    //                 as: 'user',
    //                 attributes: ['id', 'name']
    //             }, {
    //                 model: PaymentMethod,
    //                 as: 'paymentMethod',
    //                 attributes: ['name']
    //             }, {
    //                 model: Subshift,
    //                 as: 'subshifts'
    //                 // include: ['']
    //             }]
    //         });
    //         console.log("shifts: ", shifts);


    //         if (!shifts) {
    //             return res.json({ message: 'shift list empty  or not found' })
    //         }

    //         return res.json(shifts);

    //     } catch (error) {
    //         console.log(error);

    //         res.json(error);
    //     }
    // }

    /* FILTER BY DATE? SHOW  ALL OF THE DAY*/
    //     async show(req, res) {
    //         try {
    //             if (!req.params.id) {
    //                 req.status(400).json({ msg: "Id paramether required" });
    //             }

    //             const shift = await shift.findByPk(req.params.id, {
    //                 attributes: ['id', 'totalshift','createdAt'],
    //                 include:[{
    //                     model: Client,
    //                     as: 'client',
    //                     attributes: ['id','name', 'lastName']
    //                 },{
    //                     model: User,
    //                     as: 'user',
    //                     attributes: ['id','name']
    //                 },{
    //                     model: PaymentMethod,
    //                     as: 'paymentMethod',
    //                     attributes: ['name']
    //                 }] 
    //             });

    //             if (!shift) {
    //                 res.status(404).json({ msg: "Client not foud" });
    //             }

    //             res.status(200).json(shift);


    //         } catch (error) {
    //             res.status(400).json(error);
    //         }
    //     }

    // async update(req, res) {
    //     if (!req.params.id) {
    //         return req.status(400).json({ msg: "Id paramether required" });
    //     }

    //     const shift = await shift.findByPk(req.params.id);

    //     if (!shift) {
    //         return res.status(404).json({ msg: "Client not foud" });
    //     }

    //     const updated = await shift.update(req.body);

    //     return res.status(200).json(updated);
    // }


    /* ONLY ADM CAN UPDATE? */
    /* ONLY ADM CAN DELETE?  */
    //     async delete(req, res) {
    //           if (!req.params.id) {
    //            return req.status(400).json({ msg: "Id paramether required" });
    //         }

    //         const shift = await shift.findByPk(req.params.id);

    //         if (!shift) {
    //             return res.status(404).json({ msg: "Client not foud" });
    //         }

    //         await shift.destroy();

    //        return res.status(204).json({msg: "Client deleted"});
    //     }

}

module.exports = new ShiftTransactionController();