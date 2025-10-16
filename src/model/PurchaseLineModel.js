const {Sequelize, Model} = require('sequelize');

class PurchaseLine extends Model {
    static init(sequelize){
        super.init({
            
            purchaseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'purchase_orders',
                    key: 'id'
                }
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            },
            
            qty: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            unityCost: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false
            }

        }, 
        {
            sequelize,
            modelName: 'PurchaseLine',
            tableName: 'purchase_line',
            underscored: true,
            timestamps:true
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.PurchaseOrder,{
            foreignKey: 'purchaseId',
            as: 'purchase'
        });

        this.belongsTo(models.Product,{
            foreignKey: 'productId',
            as: 'product'
        });
    }

}

module.exports = PurchaseLine;