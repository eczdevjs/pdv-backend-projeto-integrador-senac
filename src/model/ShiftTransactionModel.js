const { Sequelize, Model } = require('sequelize');


class ShiftTransaction extends Model {
    static init(sequelize) {
        super.init({

            shiftId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'shifts',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },

            transactionTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'shift_transaction_types',
                    key: 'id',
                }
            },

            paymentMethodId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'payment_methods',
                    key: 'id',
                }
            },

            notes: {
                type: Sequelize.STRING,
                allowNull: true
            },

            orderId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'orders',
                    key: 'id',
                }
            },

            withdrawId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'shift_withdraws',
                    key: 'id',
                }
            },

            depositId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'shift_deposits',
                    key: 'id',
                }
            },

            returnId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            openingId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'shifts',
                    key: 'id',
                }
            }
        },
            {
                sequelize,
                modelName: 'ShiftTransaction',
                tableName: 'shift_transactions',
                timestamps: true,
                underscored: true
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Shift, {
            foreignKey: 'shiftId',
            as: 'shift'
        });

        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });


        this.belongsTo(models.ShiftTransactionType, {
            foreignKey: 'transactionTypeId',
            as: 'type'
        });

        this.belongsTo(models.PaymentMethod, {
            foreignKey: 'paymentMethodId',
            as: 'payment'
        });

        this.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        });

        this.belongsTo(models.ShiftWithdraw, {
            foreignKey: 'withdrawId',
            as: 'withdraw'
        });

        this.belongsTo(models.ShiftDeposit, {
            foreignKey: 'depositId',
            as: 'deposit'
        });
    }
}

module.exports = ShiftTransaction;



