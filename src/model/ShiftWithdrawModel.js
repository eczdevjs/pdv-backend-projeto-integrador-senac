const { Sequelize, Model } = require('sequelize');

class ShiftWithdraw extends Model {
    static init(sequelize) {
        super.init({
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            shiftId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isNegative(value) {
                        if (value > 0) {
                            throw new Error('The amoung must be negative value')
                        }
                    }
                }
            },
            reason: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },

            {
                sequelize,
                modelName: 'ShiftWithdraw',
                tableName: 'shift_withdraws',
                timestamps: true,
                underscored: true
            });

        return this;
    }

    static associate(models) {
        
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        this.belongsTo(models.Shift, {
            foreignKey: 'shiftId',
            as: 'shift'
        });

        this.hasMany(models.ShiftTransaction, {
            foreignKey: 'withdrawId',
            as:'transactions'
        })
    }

}

module.exports = ShiftWithdraw;