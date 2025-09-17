const { Sequelize, Model } = require('sequelize');
const PaymentMethod = require('./PaymentMethod');
class Order extends Model {
    static init(sequelize) {
        super.init({
                clientId: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                userId:{
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                totalOrder: {
                    type : Sequelize.DOUBLE,
                    allowNull: false
                },
                paymentMethodId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                }
            },

            {
                sequelize
            }
        )

        
        return this;
    }

    static associate(models){
        Order.belongsTo(models.PaymentMethod, {
            foreignKey: 'paymentMethodId',
            as: 'paymentMethod'
        });

        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        Order.belongsTo(models.Client, {
            foreignKey: 'clientId',
            as: 'client'
        });
    }
}

module.exports = Order;



