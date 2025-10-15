const { Sequelize, Model } = require('sequelize');


class Provider extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cnpj: {
                type: Sequelize.STRING,
                allowNull: true
            },

            notes: {
                type: Sequelize.STRING,
                allowNull: true
            }
        
        },
            {
                sequelize,
                modelName: 'Provider',
                tableName: 'providers',
                underscored: true,
                timestamps: true
            });

        return this;
    }

    static associate(models){
        this.hasMany(models.PurchaseOrder,{
            foreignKey: 'providerId',
            as: 'purchases'
        });
    }


   
}

module.exports = Provider;