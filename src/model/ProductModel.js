const { Sequelize, Model } = require('sequelize');
const Suborder = require('../model/SuborderModel');

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            brand: Sequelize.STRING,
            productModel: Sequelize.STRING,
            description: Sequelize.STRING,
            price: Sequelize.DOUBLE,
            size: Sequelize.STRING,
            isDeleted: Sequelize.BOOLEAN
        },

            {
                sequelize,
                timestamps: true,
                underscored:true
            });

        return this;
    }

    static associate(models) {
        this.hasMany(models.Suborder, {
            foreignKey: 'productId',
            as: 'suborders'
        });

        this.hasMany(models.StockTransaction, {
            foreignKey: 'productId',
            as: 'product'
        })

    }
}

module.exports = Product;



