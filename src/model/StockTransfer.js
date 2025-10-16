const { Sequelize, Model } = require('sequelize');

class StockTransfer extends Model {
    static init(sequelize) {
        super.init({
            fromStoreId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            toStoreId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            reason: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'StockTransfer',
            tableName: 'stock_transfers',
            timestamps: true,
            underscored: true
        });
    }

    static associate(models) {

        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        this.belongsTo(models.Store, {
            foreignKey: 'fromStoreId',
            as: 'originStore'
        });

        this.belongsTo(models.Store, {
            foreignKey: 'toStoreId',
            as: 'targetStore'
        });

    }
}

module.exports = StockTransfer;