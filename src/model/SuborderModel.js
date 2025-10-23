const { Sequelize, Model } = require('sequelize');

class Suborder extends Model {

    static init(sequelize) {

        super.init({
            orderId: {
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
        );
        return this;
    }

    static associate(models) {
        Suborder.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        });

        Suborder.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });
    }
}

module.exports = Suborder;



