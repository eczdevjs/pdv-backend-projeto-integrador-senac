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
        },

            {
                sequelize
            });

        return this;
    }

    static associate(models) {
        this.hasMany(models.Suborder, {
            foreignKey: 'product_id',
            as: 'suborders'
        });

    }
}

module.exports = Product;



