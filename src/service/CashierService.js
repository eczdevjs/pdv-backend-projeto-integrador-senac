const Shift = require('../model/ShiftModel');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const AppError = require('../utils/AppError');
const { Op } = require('sequelize');
const sequelize = require('../database/connection');
const Sequelize = require('sequelize');
const PaymentMethod = require('../model/PaymentMethod');
const ShiftTransactionTypeEnum = require('../model/enums/ShiftTransactionTypeEnum');
const ClientService = require('./ClientService');
const Deposit = require('../model/ShiftDepositModel');
const Withdraw = require('../model/ShiftWithdrawModel');
const ShiftTransactionType = require('../model/ShiftTransactionType');
const User = require('../model/UserModel');
const removeNullFields = require('../utils/removeNullFields');
const ShiftTransatctionType = require('../model/ShiftTransactionType');

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
                    // should i create an enum for paymentMethod?
                    paymentMethodId: 1,
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

    static async deposit(shiftId, userId, depositValue) {
        try {
            const shift = await Shift.findOne({
                where: {
                    id: shiftId,
                    endTime: null
                }
            });

            if (!shift) {
                throw new AppError("shift is already closed or does not exist");
            }

            const transaction = await sequelize.transaction(async (t) => {
                const deposit = await Deposit.create({
                    userId,
                    shiftId,
                    amount: depositValue
                }, { transaction: t });

                const shiftTransaction = {
                    shiftId: shift.id,
                    amount: depositValue,
                    userId: userId,
                    transactionTypeId: ShiftTransactionTypeEnum.DEPOSIT,
                    paymentMethodId: 1,
                    depositId: deposit.id
                }

                const shiftTransactionRegister = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                return deposit;
            });
            const balances = await CashierService.currentBalance(shiftId);
            return { transaction, balances };
        }
        catch (e) {
            throw e;
        }
    }

    static async withdraw(userId, shiftId, amount, reason) {
        try {
            const transaction = await sequelize.transaction(async (t) => {
                const withdraw = await Withdraw.create({ userId, shiftId, amount, reason }, { transaction: t });

                const shiftTransaction = {
                    shiftId,
                    amount,
                    userId,
                    transactionTypeId: ShiftTransactionTypeEnum.WITHDRAW,
                    paymentMethodId: 1,
                    withdrawId: withdraw.id
                }

                const shiftRegister = await ShiftTransaction.create(shiftTransaction, { transaction: t });

                return withdraw;
            });
            const balances = await CashierService.currentBalance(shiftId);
            return { transaction, balances };
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

                const shift = await Shift.findByPk(shiftId, { transaction: t });

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

                return shift;
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
            console.log("Filtros finais:", { userId, initialDate, endDate });

            const shifts = await Shift.findAll({
                where: {
                    [Op.and]: [
                        { userId: userId },
                        {
                            startTime: {
                                [Op.between]: [
                                    `${initialDate} 00:00:00`,
                                    `${endDate} 23:59:59`
                                ]
                            }
                        }
                    ]

                },
                attributes: ['id', 'userId', 'startTime', 'openingBalance', 'endTime', 'closingBalance', 'difference'],
                order: [['startTime', 'DESC']],
                raw: true
            });

            if (shifts.length === 0) {
                throw new AppError("Transactions not found check date paramethers and try again");
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
                    [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']
                ],
                include: [
                    {
                        model: PaymentMethod,
                        as: 'payment',
                        attributes: ['name']
                    },
                ],
                group: [
                    'ShiftTransaction.payment_method_id',
                    'payment.id',// Necessário agrupar pelo ID da tabela incluída no Postgres
                    'payment.name'

                ],
                raw: true, // Retorna um objeto JSON simples, facilitando o uso no front-end
                nest: true
            });

            return balances;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    static async cashierHistory(userId, shiftId) {
        try {
            let history = await ShiftTransaction.findAll({
                where: {
                    shiftId,
                    userId
                },
                attributes: [
                    'id', 'amount', 'orderId', 'withdrawId', 'depositId', 'returnId', 'openingId', 'createdAt'
                ],
                include: [{
                    model: User,
                    attributes: [
                        'id',
                        'name'
                    ],
                    as: 'user'
                }, {
                    model: ShiftTransactionType,
                    attributes: [
                        'id',
                        'name'
                    ],
                    as: 'type'
                }, {
                    model: PaymentMethod,
                    attributes: [
                        'id',
                        'name'
                    ],
                    as: 'payment'
                }],
                order: [['createdAt', 'DESC']]
            });

            if (!history) {
                throw new AppError("Either there is no history for that cashier or  given id does not match");
            }
            history = history.map(item => item.toJSON())
            const historyCleaned = history.map(x => removeNullFields(x));

            return historyCleaned;
        } catch (error) {
            throw error;
        }
    }


    static async getOpenedShift(userId) {
        try {
            const shift = await Shift.findOne({
                where: {
                    userId,
                    endTime: null
                }
            });

            if (!shift) throw new AppError("There is not opened shift currently", 404);

            return shift;

        } catch (error) {
            throw error;
        }

    }

}

module.exports = CashierService;