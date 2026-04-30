const { Sequelize, Model } = require('sequelize');
const {url} = require('../config/app.config');

class ProductPhoto extends Model {
    static init(sequelize) {
        super.init({
            originalName: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'originalname must be provided'
                    }
                }
            },
            fileName: {
                type: Sequelize.STRING, 
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'filename must be provided'
                    }
                }
            },
            // Criacao de campo virtual para acesso da imagem via url
            url: {
                type: Sequelize.VIRTUAL,
                get(){
                    return `${url}/images/${this.getDataValue('fileName')}`
                }
            }
        },
            {
                sequelize,
                tableName: 'product_photos',
                timestamps: true,
                underscored: true
            });

        return this;
    }


}

module.exports = ProductPhoto;



