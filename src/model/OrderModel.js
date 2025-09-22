const { Sequelize, Model } = require('sequelize');
const PaymentMethod = require('./PaymentMethod');
const Suborder = require('../model/SuborderModel');

class Order extends Model {
    static init(sequelize) {
        super.init({
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalOrder: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            paymentMethodId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },

            {
                sequelize,
                modelName: 'Order',
                tableName: 'orders',
                underscored: true
            }
        )


        return this;
    }

    static associate(models) {
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

        Order.hasMany(models.Suborder, {
            foreignKey: 'order_id',
            as: 'suborders'
        });

        this.hasMany(models.ShiftTransaction, {
            model: 'ShiftTransaction',
            as: 'order'
        });
    }
}

module.exports = Order;



