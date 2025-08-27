const { Sequelize, Model } = require('sequelize');

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
}

module.exports = Product;



