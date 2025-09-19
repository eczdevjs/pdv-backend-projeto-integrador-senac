const ShiftTransactionType = require('../model/ShiftTransactionType');

class ShiftTransactionTypeController {
    async store(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: "body product is missing" })
        }

        try {

            const newType = await ShiftTransactionType.create(req.body);
            if (!newType) {
                return res.status(500).json({ msg: "Error creating product" })
            }
            res.status(201).json(newType);
        } catch (e) {
            res.json(e);
        }

    }


    async index(req, res) {
        try {

            const types = await ShiftTransactionType.findAll({ attributes: ['id', 'name'] });
            if (!types) {
                return res.status(404).json({ message: 'Type list empty  or not found' });
            }

            return res.status(200).json(types);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    // async show(req, res) {
    //     try {
    //         if (!req.params.id) {
    //             req.status(400).json({ msg: "Id paramether required" });
    //         }

    //         const product = await Product.findByPk(req.params.id);

    //         if (!product) {
    //             res.status(404).json({ msg: "Product not foud" });
    //         }

    //         res.status(200).json(product);


    //     } catch (error) {
    //         res.status(400).json(error);
    //     }
    // }

    // async update(req, res) {
    //     if (!req.params.id) {
    //         return req.status(400).json({ msg: "Id paramether required" });
    //     }

    //     const product = await Product.findByPk(req.params.id);

    //     if (!product) {
    //         return res.status(404).json({ msg: "Client not foud" });
    //     }

    //     const updated = await product.update(req.body);

    //     return res.status(200).json(updated);
    // }

    // async delete(req, res) {
    //     if (!req.params.id) {
    //         return req.status(400).json({ msg: "Id paramether required" });
    //     }

    //     const product = await Product.findByPk(req.params.id);

    //     if (!product) {
    //         return res.status(404).json({ msg: "Product not foud" });
    //     }

    //     await product.destroy();

    //     return res.status(204).json({ msg: "Product deleted" });
    // }

}

module.exports = new ShiftTransactionTypeController();