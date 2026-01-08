const Shift = require('../model/ShiftModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const AppError = require('../utils/AppError');
const { Op } = require('sequelize');
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');
const PaymentMethod = require('../model/PaymentMethod');
const ShiftTransactionTypeEnum = require('../model/enums/ShiftTransactionTypeEnum');
const ClientService = require('./ClientService');
class CashierService {

    static async open(user, openingValue) {
        try {

            const result = await sequelize.transaction(async (t) => {
                const openedShift = await Shift.findOne({
                    where: {
                        userId: user,
                        endTime: null
                    }
                });

                if (openedShift) {
                    throw new AppError("Shift transaction has already been  opened", 400);
                }

                const shift = await Shift.create({
                    userId: user, openingBalance: openingValue
                }, { transaction: t });

                if (!shift) throw new AppError("Error creating shift");

                const shiftTransaction = {
                    shiftId: shift.id,
                    amount: shift.openingBalance,
                    userId: shift.userId,
                    transactionTypeId: ShiftTransactionTypeEnum.OPENING,
                    paymentMethodId: 4,
                    openingId: shift.id
                }
                
                const transactionRegister = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                const { id, userId, startTime, openingBalance } = shift;

                return { id, userId, startTime, openingBalance }
            });
            return result;
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

            const result = sequelize.transaction(async (t) => {

                const shift = await Shift.findByPk(shiftId,{transaction:t});
              
                if (!shift) throw new AppError("Shift not found");
                if (shift.dataValues.endTime) throw new AppError("Shift transaction has already been closed", 400);

                const sum = parseFloat(await ShiftTransaction.sum('amount', { where: { shiftId } })) || 0.0;

                const difference = closingBalance - sum;
                await shift.update({ closingBalance, difference }, { transaction: t });

                const shiftTransaction = {
                    shiftId: shift.id,
                    amount: closingBalance,
                    userId: shift.userId,
                    transactionTypeId: ShiftTransactionTypeEnum.CLOSING,
                    paymentMethodId: 4,
                    openingId: shift.id
                }

                const transactionRegister = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                return  shift;
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    // logged user can access only his shift history;
    static async getShift(shiftId, userId) {
        try {
            const shift = await Shift.findOne({ where: { id: shiftId, userId } });

            if (!shift) throw new AppError("Shift transaction not found, or it does not belong to user", 404);

            return shift;

        } catch (error) {
            throw error;
        }
    }


    static async filterByDate(initialDate, endDate, userId) {
        try {
            const shifts = await Shift.findAll({
                where: {
                    startTime: {
                        [Op.gte]: `${initialDate} 00:00:00`,
                        [Op.lt]: `${endDate} 23:59:59`
                    },
                    userId
                }
            });

            if (!shifts) {
                throw new AppError("Transactions not found check dates paramethers and try again");
            }

            return shifts;

        } catch (error) {
            throw error;
        }
    }

    static async currentBalance(shiftId) {
        try {

            const balances = await ShiftTransaction.findAll({
                where: { shiftId },
                attributes: [
                    [Sequelize.col('payment_method_id'), 'paymentMethodId'],
                    // Realiza a soma do campo amount
                    [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
                ],
                include: [
                    {
                        model: PaymentMethod,
                        as: 'payment', 
                        attributes: ['name']
                    }
                ],
                group: [
                    'ShiftTransaction.payment_method_id',
                    'payment.id' // Necessário agrupar pelo ID da tabela incluída no Postgres
                ],
                raw: true, // Retorna um objeto JSON simples, facilitando o uso no front-end
                nest: true
            });

            return balances;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CashierService;