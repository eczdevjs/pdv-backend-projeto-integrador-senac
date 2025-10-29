const ProductService = require('../service/ProductService');
const AppError = require('../utils/AppError');

class ProductController {

    static async store(req, res, next) {

        try {
            const { id, name, brand, productModel, size, description, price } = req.body;
            const newProduct = await ProductService.store(id, name, brand, productModel, size, description, price);
            if (!newProduct) {
                throw new AppError("Error creating product register: Aborted", 500);
            }
            res.status(201).json(newProduct);
        } catch (e) {
            next(e)
        }
    }

    static async index(req, res, next) {
        try {
            const products = await ProductService.index();
            if (!products) {
                throw new AppError("Product not found: Aborted", 404);
            }
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }
            const { id } = req.params;
            const product = await ProductService.show(id);
            if (!product) {
                throw new AppError("Error not found: Aborted", 404);
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            if (!req.params.id) {
                return req.status(400).json({ msg: "Id paramether required" });
            }
            const { id } = req.params;
            const productToUpdate = req.body;
            const productUpdated = await ProductService.update(id, productToUpdate);
            if (!productUpdated) {
                throw new AppError("Error updating product register: Aborted", 500);
            }
            return res.status(200).json(productUpdated);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            if (!req.params.id) {
                return req.status(400).json({ msg: "Id paramether required" });
            }
            const { id } = req.params;
            const success = await ProductService.delete(id);
            if (!success) {
                throw new AppError("Error deleting product register: Aborted", 500);
            }
            return res.status(200).json({ msg: "Product deleted" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;