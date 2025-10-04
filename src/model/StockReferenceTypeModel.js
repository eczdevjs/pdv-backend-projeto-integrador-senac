const { Sequelize, Model } = require('sequelize');


class StockRefereceType extends Model {
    static init(sequelize) {
        super.init({
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            tableName: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'StockRefereceType',
            tableName: 'stock_reference_type',
            timestamps: true,
            underscored: true
        })
    }

    // associate to stock transactions
    // static assciate(models){

    // }
}

module.exports = StockRefereceType;