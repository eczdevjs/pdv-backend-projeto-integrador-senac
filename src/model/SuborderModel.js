const { Sequelize, Model } = require('sequelize');
const Order = require('../model/OrderModel');
const Product = require('../model/ProductModel');

class Suborder extends Model {
    static init(sequelize) {
        super.init({
            order_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
                
            },
            productId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
              
            },
            productPrice: {
                type: Sequelize.DECIMAL(10.2),
                allowNull: false
            },
            qtt: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            total: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            }
        },
            {
                sequelize, 
                modelName: 'Suborder',
                tableName: 'suborders',
                underscored: true
            }
        )


        return this;
    }

    static associate(models) {
        Suborder.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order'
        });

        Suborder.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });
    }
}

module.exports = Suborder;



