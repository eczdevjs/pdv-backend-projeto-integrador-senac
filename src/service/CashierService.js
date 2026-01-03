const Shift = require('../model/ShiftModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const AppError = require('../utils/AppError');
const {Op} = require('sequelize');


class CashierService {

    static async open(user, openingValue) {
        try {

            const openedShift = await Shift.findOne({where: {
                userId: user,
                endTime: null
            }});

            console.log(openedShift);

            if(openedShift){
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

    //1-shift id exists? 2- if so ,has it already been closed?
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

    
    static async filterByDate(initialDate, endDate, userId) {
        try {
            const shifts = await Shift.findAll({where: {
                startTime:{
                [Op.gte]: `${initialDate} 00:00:00`,
                [Op.lt]:`${endDate} 23:59:59`
                },
                userId
            }});

            if(!shifts){
                throw new AppError("Transactions not found check dates paramethers and try again");
            }
            
            return shifts;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = CashierService;