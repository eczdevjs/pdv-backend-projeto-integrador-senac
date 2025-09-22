const { Sequelize, Model } = require('sequelize');

class PaymentMethod extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: "Payment method must have a name"
                    },
                    len: {
                        args: [3, 255],
                        msg: 'Payment\'s method name must have at least 3 to 255 characters'
                    }
                }
            }
        }, {
            sequelize
        });

        return this;
    }

    static associate(models) {

        this.hasMany(models.ShiftTransaction, {
            model: 'ShiftTransaction',
            as: 'payment'
        });
        
    }
}

module.exports = PaymentMethod;



