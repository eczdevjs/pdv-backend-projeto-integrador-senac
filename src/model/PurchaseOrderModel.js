const {Sequelize, Model} = require('sequelize');

class PurchaseOrder extends Model{
   static init(sequelize){
        super.init({
            
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },

            providerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'providers',
                    key: 'id'
                }
            },
            
            invoiceNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            total: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'PurchaseOrder',
            tableName: 'purchase_orders',
            underscored: true,
            timestamps:true
        })

        return this;
    }

    static associate(models){
        this.belongsTo(models.Provider,{
            foreignKey: 'providerId',
            as: 'provider'
        });

        this.belongsTo(models.User,{
            foreignKey: 'userId',
            as: 'user'
        });
    }
}

module.exports = PurchaseOrder;