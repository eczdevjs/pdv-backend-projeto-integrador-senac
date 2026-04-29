const User = require('../model/UserModel');

const multer = require('multer');
const multerConfig = require('../config/multerConfig');

const updload = multer(multerConfig).single('photo');


class PhotoController {
    async store(req, res, next) {
        try {

            return updload(req, res, (err) =>{
                if(err){
                    return res.status(400).json({errors: [err.code]})
                }

                return res.status(201).json(req.file);
            });
        } catch (e) {
            res.json(e);
        }

    }
}

module.exports = new PhotoController();