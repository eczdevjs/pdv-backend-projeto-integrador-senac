const App = require('../../App');
const ProductService = require('../service/ProductService');
const AppError = require('../utils/AppError');

class ProductController {

    static async store(req, res, next) {

        try {
            const { id, name, brand, productModel, size, description, price } = req.body;
            const newProduct = await ProductService.store(id, name, brand, productModel, size, description, price);
            res.status(201).json(newProduct);
        } catch (e) {
            next(e)
        }
    }

    static async index(req, res, next) {
        try {
            const products = await ProductService.index();
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error("Id paramether is required, or given id mismatched");
            }

            if (!parseInt(req.params.id)) {
                throw new AppError("given id is mismatched", 404);
            }

            const { id } = req.params;
            const product = await ProductService.show(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("Id paramether is required", 400);
            }

            const { id } = req.params;
            const productToUpdate = req.body;
            const productUpdated = await ProductService.update(id, productToUpdate);
            return res.status(200).json(productUpdated);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("Id paramether is required");
            }

            const { id } = req.params;
            const success = await ProductService.delete(id);


            return res.status(200).json({
                status: 'success',
                id
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllDeleted(req, res, next) {
        try {

            const products = await ProductService.getAllDeleted();
            return res.status(200).json(products);

        } catch (error) {
            next(error);
        }
    }

    static async restore(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("Id paramether is missing", 400);
            }

            const { id } = req.params;
            const success = await ProductService.restore(id);

            if (!success) {
                throw new AppError("Error deleting product register: Aborted", 500);
            }
            return res.status(200).json({ 
                status: 'Success',
                message: "Product restored" ,
                data: {id}
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;