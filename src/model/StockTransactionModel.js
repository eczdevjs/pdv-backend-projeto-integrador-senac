const { Sequelize, Model } = require('sequelize');

class StockTransaction extends Model {
    static init(sequelize) {
        super.init({
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            qtyChange: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            unityCost: {
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
            as: 'product'
        });

        this.belongsTo(models.User,{
            foreignKey:'userId',
            as: 'user'
        })

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