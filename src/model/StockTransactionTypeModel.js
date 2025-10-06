const { Sequelize, Model } = require('sequelize');


class StockTransactionType extends Model {
    static init(sequelize) {
        super.init({
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'StockTransactionType',
            tableName: 'stock_transaction_type',
            timestamps: true,
            underscored: true
        })
    }

    
    static assciate(models){

        this.hasMany(models.StockTransactions,{
            foreignKey: 'typeId',
            as: 'type'
        });

    }
}

module.exports = StockTransactionType;