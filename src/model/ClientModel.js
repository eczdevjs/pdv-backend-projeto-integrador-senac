const { Sequelize, Model } = require('sequelize');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
            addresId: {
                type: sequelize.INTEGER,
                allowNull:true
            }

        }, {
            sequelize
        });


        this.addHook('beforeSave', async (user, options) => {
            if (user.changed('password')) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    validatePassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }

}

module.exports = User;



