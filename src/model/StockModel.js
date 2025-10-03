const { Sequelize, Model } = require('sequelize');

class Stock extends Model {
    static init(sequelize) {
        super.init({
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            qty: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            avgCost: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            }

        },
        {
            sequelize,
            modelName: 'Stock',
            tableName: 'stock',
            timestamps: true,
            underscored: true
        });
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'products'
        })
    }

}

module.exports = Stock;

// calculate avg_cost, old_qty  * old_avg_cost + new_qty * new_cost / (old_qty + new_qty)