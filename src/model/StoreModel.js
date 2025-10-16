const { Sequelize, Model } = require('sequelize');

class Store extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            cnpj: {
                type: Sequelize.STRING,
                allowNull: true
            },

            phone: {
                type: Sequelize.STRING,
                allowNull: true
            },

        }, {
            sequelize,
            modelName: 'Store',
            tableName: 'stores',
            underscored: true,
            timestamps: true
        })

        return this;
    }

    static associate(models){
        this.hasMany(models.StockTransfer,{
            foreignKey: 'storeId',
            as: 'store'
        });
    }
}


module.exports = Store;