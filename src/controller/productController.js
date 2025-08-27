const Product = require('../model/ProductModel');

class ProductController {
    async store(req, res) {
    try{
            const newProduct = await Product.create({
            name: "Isotonico",
            brand: "Gatorade",
            productModel: "350ml",
            description: "Gatorade 350ml",
            price: 8.0,
            size: "350ml"
        });

        res.status(201).json(newProduct);
    }catch(e){
        res.json(e);
    }
    
    }
}

module.exports = new ProductController();