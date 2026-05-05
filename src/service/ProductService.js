const Product = require('../model/ProductModel');
const AppError = require('../utils/AppError');
const ProductPhoto = require('../model/ProductPhoto');
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
                where: { isDeleted: false },
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
                    id,
                    isDeleted: false
                }, include: {
                    model: ProductPhoto,
                    as: 'photo',
                    order: [['createdAt', 'DESC']]
                }
            });
         
            return product;
        } catch (error) {
            throw error;
        }
    }


    static async update(id, productToUpdate) {

        try {
            const product = await Product.findOne({ where: { id, isDeleted: false } });

            if (!product) {
                throw new AppError('Error: product not found');
            }

            const updated = await product.update(productToUpdate);
            return updated;
        } catch (error) {
            throw error;
        }
    }


    static async delete(id) {
        
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                throw new Error('Product not found');
            }

            await product.update({ isDeleted: true });

            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAllDeleted() {
        try {
            const deletedList = Product.findAll({ where: { isDeleted: true } });

            return deletedList;

        } catch (error) {
            throw error;
        }
    }

    static async restore(id) {

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                throw new AppError('Error: product not found');
            }

            if (product.isDeleted === false) {
                throw new AppError('product is not deleted thus can not be restored');
            }

            const updated = await product.update({ isDeleted: false });

            return updated;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductService;