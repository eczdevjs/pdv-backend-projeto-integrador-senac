const { Sequelize, Model } = require('sequelize');

class ShiftTransactionType extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },

            {
                sequelize,
                modelName: 'ShiftTransactionType',
                tableName: 'shift_transaction_types',
                timestamps: true,
                underscored: true
            });

        return this;
    }

}

module.exports = ShiftTransactionType;