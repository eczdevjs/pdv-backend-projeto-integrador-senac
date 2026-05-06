const Product = require('../model/ProductModel');
const AppError = require('../utils/AppError');
const ProductPhoto = require('../model/ProductPhoto');
const Stock = require('../model/StockModel');
const  {Op} = require('sequelize') ;


class ProductService {

    static async store(id, name, brand, productModel, size, description, price) {

        try {

            const product = await Product.create({ id, name, brand, productModel, size, description, price, isDeleted: false });

            return product;

        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async index() {

        try {

            const products = await Product.findAll({
                attributes: ['id', 'name', 'brand', 'productModel', 'size', 'description', 'price'],
                order: [['createdAt', 'DESC']],
                include: {
                    model: ProductPhoto,
                    as: 'photo',
                    order: [['createdAt', 'DESC']]
                }
            });

            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async show(id) {

        try {
            const product = await Product.findOne({
                where: {
                    id
                }, include: {
                    model: ProductPhoto,
                    as: 'photo',
                    order: [['createdAt', 'DESC']]
                }
            });
            if(!product) throw new AppError('Product not found', 404);
            return product;
        } catch (error) {
            throw error;
        }
    }


    static async update(id, productToUpdate) {

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                throw new AppError('Error: product not found');
            }

            const updated = await product.update(productToUpdate);
            return updated;
        } catch (error) {
            throw error;
        }
    }


    static async softDelete(id) {

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                throw new AppError('Product not found',404);
            }


            const stockQtt = await Stock.findOne({
                where: { productId : id },
                attributes: ['qty']
            });

            if (stockQtt &&  stockQtt.dataValues.qty > 0) {
                throw new AppError(`To remove the product, the quantity in stock must be 0. Current Stock: ${stockQtt.dataValues.qty}`, 400);
            }

            await product.destroy();

            return true;

        } catch (error) {
            throw error;
        }
    }


    static async deletedIndex() {
        try {
            const deletedList = await Product.findAll({
                where: {
                    deleted_at: {
                        [Op.not]: null
                    }
                },
                paranoid: false
            });

            return deletedList;

        } catch (error) {
            throw error;
        }
    }

    static async restore(id) {

        try {
            const product = await Product.findByPk(id, {paranoid:false});

            if (!product) {
                throw new AppError('Error: product not found');
            }
            console.log(product)
            if (!product.dataValues.deletedAt) {
                throw new AppError('product is not deleted thus can not be restored', 400);
            }

            const updated = await product.restore();

            return updated;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductService;