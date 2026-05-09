const { Sequelize, Model } = require('sequelize');
const validator = require('validator');


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

            email: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isEmailorNull(value) {
                        if (!value) return;
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            throw new Error('Invalid email format');
                        }
                    }
                }
            },

            phone: {
                type: Sequelize.STRING,
                defaultValue: '',
                allowNull: true,
                validate: {
                    // notEmpty: {
                    //     msg: 'phone field can not be empty',
                    // },
                    isMobilePhone(value) {
                        if(!value) return;
                        if (!validator.isMobilePhone(value, 'pt-BR')) {
                            throw new Error('Invalid Brazilian phone number format')
                        }
                    },
                }
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
                paranoid: true,
                timestamps: true
            });

        return this;
    }

    static associate(models) {
        this.hasMany(models.PurchaseOrder, {
            foreignKey: 'providerId',
            as: 'purchases'
        });
    }



}

module.exports = Provider;