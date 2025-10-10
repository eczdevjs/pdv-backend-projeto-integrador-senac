const {Sequelize, Model} = require('sequelize');

class StockAdjustment extends Model {
    static init(sequelize){
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

            reason: {
                type: Sequelize.STRING,
                allowNull: false
            },

            referenceCode: {
                type: Sequelize.INTEGER,
                allowNull: false
            }

        }, {
            sequelize,
            modelName: 'StockAdjustment',
            tableName: 'stock_adjustments',
            timestamps: true,
            underscored: true
        });
    }

    static associate(models){

        this.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });

        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    }
}

module.exports = StockAdjustment;