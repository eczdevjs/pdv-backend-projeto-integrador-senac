const { Sequelize, Model } = require('sequelize');

class Shift extends Model {
    static init(sequelize) {
        super.init({

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            startTime: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            openingBalance: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            endTime: {
                type: Sequelize.DATE,
                allowNull: true
            },

            closingBalance: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true

            },

            difference: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            }
        },
            {
                sequelize,
                modelName: 'Shift',
                tableName: 'shifts',
                timestamps: false,
                underscored: true,
                hooks: {
                    beforeUpdate: (shift, options) => {
                        if (options.fields.includes('closingBalance') && !shift.endTime) {
                            shift.endTime = new Date();
                        }
                    }
                }
            }
        )

        return this;
    }

    static associate(models) {

        Shift.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        this.hasMany(models.ShiftTransaction, {
            foreignKey: 'shiftId',
            as: 'transactions'
        });


    }
}

module.exports = Shift;



