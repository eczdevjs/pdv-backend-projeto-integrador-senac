const ShiftService = require('../service/CashierService');
const CashierService = require('../service/CashierService');



class CashierController {

    static async open(req, res, next) {

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
            const {userId, openingBalance} = req.body;
            const shift = await CashierService.open(userId,openingBalance);
            return res.status(201).json(shift);
        } catch (error) {
          next(error)
        }
    }

    static async close(req, res, next) {

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
            const {shiftId, closingBalance} = req.body;
            const shift = await CashierService.close(shiftId, closingBalance);
            return res.status(201).json(shift);
        } catch (error) {
          next(error)
        }
    }
    
    static async getShift(req, res, next){
       try {
        const {shiftId, userId} = req.body;

            const shift = await ShiftService.getShift(shiftId, userId);
            return res.status(200).json(shift);
       } catch (error) {
            next(error)
       }
    }
}

module.exports = CashierController;
                                                                            
                                                                         
                                                    

















/// impelmentar o close
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