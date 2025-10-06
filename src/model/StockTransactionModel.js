const { Sequelize, Model } = require('sequelize');

class StockTransaction extends Model {
    static init(sequelize) {
        super.init({
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            qtyChange: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            unity_cost: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            referenceTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            referenceId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }


        }, {
            sequelize,
            modelName: 'StockTransaction',
            tableName: 'stock_transactions',
            timestamps: true,
            underscored: true
        })

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'products'
        });

        this.belongsTo(models.StockTransactionType, {
            foreignKey: 'typeId',
            as: 'type'
        });

        this.belongsTo(models.StockReferenceType, {
            foreignKey: 'referenceTypeId',
            as: 'referenceType'
        });
    }
}


module.exports = StockTransaction;