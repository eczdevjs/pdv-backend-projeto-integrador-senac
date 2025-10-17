const { Sequelize, Model } = require('sequelize');

class StockTransferLine extends Model {
    static init(sequelize) {
        super.init({
            transferId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            qty: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            unityCost: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

        }, {
            sequelize,
            modelName: 'StockTransferLine',
            tableName: 'stock_transfers_line',
            timestamps: true,
            underscored: true
        });
    }

    static associate(models) {

   
        this.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });

        this.belongsTo(models.StockTransfer, {
            foreignKey: 'transferId',
            as: 'transfer'
        });

    }
}

module.exports = StockTransferLine;