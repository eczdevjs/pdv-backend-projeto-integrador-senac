const ProductService = require('../service/ProductService');


class ProductController {

    static async store(req, res) {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "Body requisition is missing" });
        }

        const { id, name, brand, productModel, size, description, price } = req.body;

        try {

            const newProduct = await ProductService.store(id, name, brand, productModel, size, description, price);

            if (!newProduct) {
                return res.status(500).json({ msg: "Error creating product" })
            }

            res.status(201).json(newProduct);
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }

    }


    static async index(req, res) {

        try {
            console.log('product controller')
            const products = await ProductService.index();

            if (!products) {
                return res.status(404).json({ message: 'Product list empty  or not found' });
            }

            return res.status(200).json(products);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    static async show(req, res) {
        try {

            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }

            const { id } = req.params;

            const product = await ProductService.show(id);

            if (!product) {
                res.status(404).json({ msg: "Product not foud" });
            }

            res.status(200).json(product);


        } catch (error) {
            res.status(400).json(error);
        }
    }



    static async update(req, res) {
        try {

            if (!req.params.id) {
                return req.status(400).json({ msg: "Id paramether required" });
            }

            const { id } = req.params;
            const productToUpdate = req.body;

            const productUpdated = await ProductService.update(id, productToUpdate);

            if (!productUpdated) {
                return res.status(500).json({ msg: "Error updating product: aborted" });
            }

            return res.status(200).json(productUpdated);

        } catch (error) {

            console.log(error);
            return res.status(500).json({ msg: `Error updating product: aborted, error: ${error.message}` });
        }
    }


    static async delete(req, res) {
      try {
          if (!req.params.id) {
            return req.status(400).json({ msg: "Id paramether required" });
        }

        const {id} = req.params;

        const success = await ProductService.delete(id);

        if(!success){
        return res.status(500).json({ msg: "Error deleting product : aborted" });
        }
        
        return res.status(200).json({ msg: "Product deleted" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({msg: `Error deleting: ${error.message}`});
      }
    }
}

module.exports = ProductController;