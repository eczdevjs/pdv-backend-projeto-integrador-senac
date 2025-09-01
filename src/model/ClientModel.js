const { Sequelize, Model } = require('sequelize');
const validator = require('validator');

class Client extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Name field can not be empty',

                    },
                    len: {
                        args: [3, 255],
                        msg: 'Name field name must have at least 3 characters'
                    }
                }
            },
            lastName: {
                type: Sequelize.STRING,
                defaultValue: '',
                allowNull:true
            },
            email: {
                type: Sequelize.STRING,
                allowNull:true,
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
                validate: {
                    notEmpty: {
                        msg: 'phone field can not be empty',

                    },
                    isMobilePhone(value) {
                        if (!validator.isMobilePhone(value, 'pt-BR')) {
                            throw new Error('Invalid Brazilian phone number format')
                        }
                    },
                }
            },
            addressId: {
                type: Sequelize.INTEGER,
                allowNull:true
            }

        }, {
            sequelize
        });

        return this;
    }


}

module.exports = Client;


// adicionar as validacoes corretas para clientes
