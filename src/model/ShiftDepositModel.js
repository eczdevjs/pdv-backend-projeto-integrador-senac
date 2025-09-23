const { Sequelize, Model } = require('sequelize');

class ShiftDeposit extends Model {
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
                type: Sequelize.DECIMAL(10,2),
                allowNull: false,
                validate: {
                    isPositive(value){
                        if(value < 0){
                            throw new Error("Deposit value must be positibe (more than 0)")
                        }
                    }
                }
            }
        },

        {
            sequelize,
            modelName: 'ShiftDeposit',
            tableName: 'shift_deposits',
            timestamps: true,
            underscored:true
        });

        return this;
    }

    static associate(models){
        ShiftDeposit.belongsTo(models.User,{
            foreignKey: 'userId',
            as: 'user'
        });

        ShiftDeposit.belongsTo(models.Shift, {
            foreignKey: 'shiftId',
            as: 'shift'
        })

        this.hasMany(models.ShiftTransaction, {
            foreignKey: 'depositId',
            as: 'transactions'
        })
    }

}

module.exports = ShiftDeposit;