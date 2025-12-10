const Shift = require('../model/ShiftModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const AppError = require('../utils/AppError');



class ShiftService {

    static async open(user, openingValue) {
        try {

            const openShift = await Shift.findOne({where: {
                userId: user,
                endTime: null
            }});

            console.log(openShift);

            if(openShift){
                throw new AppError("Shift transaction has already been  opened",400);
            }

            const shift = await Shift.create({
                userId: user, openingBalance: openingValue
            });
            if (!shift) throw new AppError("Error creating shift");
            const { id, userId, startTime, openingBalance } = shift;
            return { id, userId, startTime, openingBalance }
        } catch (error) {
            throw error;
        }
    }

    //1-shift id exists 2- if has it already been closed
    static async close(shiftId, closingBalance) {
        try {
            if (!shiftId || !closingBalance) throw new AppError("Required field is missing");

            const shift = await Shift.findByPk(shiftId);
            if (!shift) throw new AppError("Shift not found");
            if (shift.dataValues.endTime) throw new AppError("Shift transaction has already been closed", 400);

            const openingBalance = parseFloat(shift.dataValues.openingBalance);
            const sum = parseFloat(await ShiftTransaction.sum('amount', { where: { shiftId } })) || 0.0;

            const finalBalance = sum + openingBalance;
            const difference = closingBalance - finalBalance;
    
            await shift.update({ closingBalance, difference });

            return shift;
        } catch (error) {
            throw error;
        }
    }

    // logged user can access only his shift history;
    static async getShift(shiftId, userId) {
        try {
            const shift = await Shift.findOne({where:{id:shiftId, userId}});

            if(!shift) throw new AppError("Shift transaction not found, or it does not belong to user", 404);
            
            return shift;
            
        } catch (error) {
            throw error;
        }
    }

    // index method: show transactions of user
    
    static async filterByDate(initialDate, endDate) {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = ShiftService;