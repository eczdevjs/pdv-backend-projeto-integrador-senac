const ShiftService = require('../service/CashierService');
const CashierService = require('../service/CashierService');



class CashierController {

    static async open(req, res, next) {

        // fields are required and can not be null
        for (let key in req.body) {
            if (!req.body[key]) {
                return res.status(400).json({ msg: "Operation can not be perfomed: fields can not be null" });
            }
        }

        try {
            const { openingBalance } = req.body;
            const userId = req.userId;
            const shift = await CashierService.open(userId, openingBalance);
            return res.status(201).json(shift);
        } catch (error) {
            next(error);
        }
    }

    static async close(req, res, next) {
        try {
            const {closingBalance} = req.body;
            const {shiftId} = req.params;
            if(!shiftId || !closingBalance){
                return res.status(400).json("shiftId and closing balance must be provided");
            }

            if(typeof closingBalance !== 'number' || typeof shiftId !== number){
                return res.status(400).json("Data type mismatch");
            }

            const shift = await CashierService.close( shiftId, closingBalance);
            return res.status(201).json(shift);
        } catch (error) {
            next(error)
        }
    }

    static async getShift(req, res, next) {
        try {
            const {userId } = req;
            const {shiftId} = req.params
            const shift = await ShiftService.getShift(shiftId, userId);
            return res.status(200).json(shift);
        } catch (error) {
            next(error)
        }
    }

    static async filterByDate(req, res, next) {
        try {
            const {initialDate, endDate} = req.body;
            const {userId} = req;

            const shifts = await CashierService.filterByDate(initialDate, endDate, userId);

            if (!shifts) {
                throw new AppError("Transactions not found", 404);
            }

            return res.status(200).json(shifts);

        } catch (error) {
            throw error;
        }
    }

       static async currentBalances(req, res, next) {
        try {
            const {shiftId} = req.body;
            console.log("ShifId =---------",shiftId);
         
            const balances = await CashierService.currentBalance(shiftId);
            if (!balances) {
                throw new AppError("It was not possible get balances, check if cashier has already been opened", 404);
            }

            return res.status(200).json(balances);

        } catch (error) {
            throw error;
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