const Product = require('../model/ProductModel');

class ProductService {

    static async store(id, name, brand, productModel, size, description, price) {

        try {
            
            const product = await Product.create({ id, name, brand, productModel, size, description, price});

            if (!product) {
                throw new Error('Error creating product register: aborted');
            }

            return product;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async index() {

        try {

            const products = await Product.findAll({
                attributes: ['id', 'name', 'brand', 'productModel', 'size', 'description', 'price'],
                order: [['name', 'ASC']]
            });

            if (!products) {
                throw new Error('Error: products not found');
            }

            return products;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async show(id) {

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Error: product not found');
            }

            return product;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async update(id, productToUpdate) {

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Error: product not found');
            }
            const updated  = await product.update(productToUpdate);
            if (!updated) {
                throw new Error("Error updating product: aborted");
            }
            return updated;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async delete(id) {
        // implement flag product instead delete
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                throw new Error('Product not found');
            }

            await product.destroy();

            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ProductService;