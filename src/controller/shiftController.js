const Order = require('../model/OrderModel');
const Client = require('../model/ClientModel');
const User = require('../model/UserModel');
const PaymentMethod = require('../model/PaymentMethod');
const Suborder = require('../model/SuborderModel');
const Shift = require('../model/ShiftModel');
class ShiftController {

    async open(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "Body requisition must be provided" })
        }
        // i need to grant all fields were provided

        // at least userId and opening Balance must be provided;
        if (Object.keys(req.body).length < 2) {
            return res.status(400).json({ msg: "Operation can not be perfomed: information is missing" })
        }
        // check if fields are right, think about it


        // fields are required and can not be null
        for (let key in req.body) {
            if (!req.body[key]) {
                return res.status(400).json({ msg: "Operation can not be perfomed: fields can not be null" });
            }
        }


        try {

            const shift = await Shift.create(req.body);
            if (!shift) {
                return res.status(401).json({ msg: "error creating shift" });
            }

            const shiftFiltered = {
                id: shift.id,
                userId: shift.userId,
                startTime: shift.startTime,
                openingBalance: shift.openingBalance
            };

            return res.status(201).json(shiftFiltered);

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }

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

    async close(req, res) {
        if (!req.params.id) {
            return req.status(400).json({ msg: "Id paramether required" });
        }

        const shift = await shift.findByPk(req.params.id);

        if (!shift) {
            return res.status(404).json({ msg: "Client not foud" });
        }

        const updated = await shift.update(req.body);

        return res.status(200).json(updated);
    }


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



module.exports = new ShiftController();