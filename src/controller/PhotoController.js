const User = require('../model/UserModel');

const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const ProductPhoto = require('../model/ProductPhoto');

const updload = multer(multerConfig).single('photo');


class PhotoController {
    async store(req, res, next) {


        return updload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ errors: [err.code] })
            }

            const { originalname, filename } = req.file;
            const { productId } = req.params;

            console.log("Paramethers from photos", { originalname, filename, productId })

            try {
                const created = await ProductPhoto.create({
                    originalName: originalname,
                    fileName: filename,
                    productId: productId
                });

                return res.status(201).json(created);
            } catch (error) {
                console.log(error)
                return res.status(400).json({msg: 'product id does not exist or is missing'})
            }
        });

    }
}

module.exports = new PhotoController();



// aqui para adiantar e lembrar como fazer, vou salvar no banco sem o uso de service