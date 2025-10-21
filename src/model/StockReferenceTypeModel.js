const { Sequelize, Model } = require('sequelize');


class StockReferenceType extends Model {
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
            modelName: 'StockReferenceType',
            tableName: 'stock_reference_type',
            timestamps: true,
            underscored: true
        })
    }

    // associate to stock transactions
    static assciate(models){
        this.hasMany(models.StockTransaction, {
            foreignKey: 'referenceTypeId',
            as: 'referenceType'
        })
    }
}

module.exports = StockReferenceType;