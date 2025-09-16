const Product = require('../model/ProductModel');

class ProductController {
    async store(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "body product is missing" })
        }

        try {

            const newProduct = await Product.create(req.body);
            if (!newProduct) {
                return res.status(500).json({ msg: "Error creating product" })
            }
            res.status(201).json(newProduct);
        } catch (e) {
            res.json(e);
        }

    }

     
      async index(req, res) {
        try {

            const products = await Product.findAll({attributes: ['id','name', 'brand', 'productModel', 'description', 'price', 'size']});
            if (!products) {
                return res.status(404).json({ message: 'Product list empty  or not found' });
            }

            return res.status(200).json(products);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    async show(req, res) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }

            const product = await Product.findByPk(req.params.id);

            if (!product) {
                res.status(404).json({ msg: "Product not foud" });
            }

            res.status(200).json(product);


        } catch (error) {
            res.status(400).json(error);
        }
    }

    async update(req, res) {
        if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Client not foud" });
        }

       const updated = await product.update(req.body);

       return res.status(200).json(updated);
    }

    async delete(req, res) {
          if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not foud" });
        }

        await product.destroy();

       return res.status(204).json({msg: "Product deleted"});
    }

}

module.exports = new ProductController();