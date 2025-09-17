const { Sequelize, Model } = require('sequelize');
const validator = require('validator');
const bcrypt = require('bcryptjs');

class User extends Model {
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
                validate: {
                    notEmpty: {
                        msg: 'Last Name field can not be empty',

                    },
                    len: {
                        args: [3, 255],
                        msg: 'Last Name Field name must have at least 3 characters'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isEmail: {
                        msg: "Invalid e-mail"
                    },
                    notEmpty: {
                        msg: 'E-mail is required',

                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            phone: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isMobilePhone(value) {
                        if (!validator.isMobilePhone(value, 'pt-BR')) {
                            throw new Error('Invalid Brazilian phone number format')
                        }
                    },
                }
            },
            password: {
                type: Sequelize.VIRTUAL,
                validate: {
                    len: {
                        args: [6, 18],
                        msg: "Password too short, it must be between 6 and 18 characters"
                    }
                }
            }
        }, {
            sequelize
        });


        this.addHook('beforeSave', async (user, options) => {
            if(user.changed('password')){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    validatePassword(password){
        return bcrypt.compare(password, this.password_hash)
    }


    static associate(models){
        User.hasMany(models.Order, {
            foreignKey: 'userId',
            as: 'orders'
        });
    }


}

module.exports = User;



