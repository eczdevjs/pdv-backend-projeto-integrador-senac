const App = require('../../App');
const ShiftService = require('../service/CashierService');
const CashierService = require('../service/CashierService');
const AppError = require('../utils/AppError');


class CashierController {

    static async open(req, res, next) {

        try {
            const { openingBalance } = req.body;
            const userId = req.userId;

            if (!openingBalance || !userId) {
                throw new AppError("Required fields is missing", 400);
            }

            if (!Number(openingBalance)) {
                throw new AppError("Amount to opening cashier must be a number", 400);
            }

            const shift = await CashierService.open(userId, openingBalance);
            return res.status(201).json(shift);
        } catch (error) {
            next(error);
        }
    }

    static async close(req, res, next) {
        try {
            const { closingBalance } = req.body;
            const { shiftId } = req.params;
            if (!shiftId || !closingBalance) {
                throw new AppError("shiftId and closing balance must be provided", 400);
            }

            if (typeof Number(closingBalance) !== 'number' || typeof Number(shiftId) !== 'number') {
                throw new AppError("Data type mismatch", 400);
            }

            const shift = await CashierService.close(shiftId, closingBalance);
            return res.status(201).json(shift);
        } catch (error) {
            next(error)
        }
    }

    static async deposit(req, res, next) {
        try {
            const { shiftId } = req.params;
            const { userId } = req;
            const { amount } = req.body;

            if (!shiftId || !amount || !userId) {
                throw new AppError("shiftId and closing balance must be provided", 400);
            }

            if (amount <= 0 || !amount) {
                throw new AppError("Deposit value must be provided and greater than zero", 400);
            }


            const deposit = await CashierService.deposit(shiftId, userId, amount);

            if (!deposit) {
                throw new AppError("Error creating deposit register, operation aborted!");
            }

            return res.status(201).json({ success: true, data: deposit });
        } catch (error) {
            next(error);
        }
    }

    static async withdraw(req, res, next) {
        try {
            const { shiftId } = req.params;
            const { userId } = req;
            const { amount, reason } = req.body;

            if (!reason || !amount || !shiftId || !userId) {
                throw new AppError("Required data is missing to withdraw operations",400);
            }

            if (amount >= 0) {
                throw new AppError("withdraw amount must be lesser than zero (negative)", 400);
            }

            const withdraw = await CashierService.withdraw(userId, shiftId, amount, reason);

            if (!withdraw) {
                throw new AppError("Error creating withdraw register, operation aborted!",500);
            }

            return res.status(201).json({ success: true, data: withdraw });
        } catch (error) {
            next(error);
        }
    }

    static async getShift(req, res, next) {
        try {
            const { userId } = req;
            let { shiftId } = req.params;

            if (!shiftId || !userId) {
                throw new AppError("Required data is missing", 400);
            }
            shiftId = Number(shiftId);

            if (typeof shiftId !== 'number') {
                throw new AppError("Data type mismatch", 400);
            }

            const shift = await ShiftService.getShift(shiftId, userId);
            return res.status(200).json(shift);
        } catch (error) {
            next(error)
        }
    }

    static async filterByDate(req, res, next) {
        try {
            console.log(req.query);
            const { initialDate, endDate } = req.query;
            const { userId } = req;
            console.log("userId controller: =================== ", userId);
            console.log(initialDate, endDate)

            if (!initialDate || !endDate) {
                throw new AppError("Both initial date and end date must be provided", 400);
            }
            const shifts = await CashierService.filterByDate(initialDate, endDate, userId);

            if (shifts.length === 0) {
                throw new AppError("Transactions not found", 404);
            }

            return res.status(200).json(shifts);

        } catch (error) {
            throw error;
        }
    }

    static async currentBalances(req, res, next) {
        try {
            const { shiftId } = req.params;

            if (!shiftId || typeof Number(shiftId) !== 'number') {
                throw new AppError('Invalid ID', 400);
            }

            const balances = await CashierService.currentBalance(shiftId);

            if (!balances) {
                throw new AppError("It was not possible get balances, check if cashier has already been opened", 404);
            }

            return res.status(200).json(balances);

        } catch (error) {
            throw error;
        }
    }

    static async cashierHistory(req, res, next) {
        try {
            const { userId } = req
            const { shiftId } = req.params;

            if (!userId || !shiftId) {
                console.log("Error: UserId or shiftId not provided");
                throw new AppError("required field is missing", 400);
            }

            if (!parseInt(shiftId)) {
                throw new AppError("Given id does not match type");
            }

            const history = await CashierService.cashierHistory(parseInt(userId), parseInt(shiftId));

            return res.status(200).json(history);

        } catch (error) {
            next(error);
        }
    }

    static async getOpenedShift(req, res, next) {
        try {
            const { userId } = req

            const shift = await CashierService.getOpenedShift(userId);

            return res.status(200).json(shift);

        } catch (error) {
            next(error);
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