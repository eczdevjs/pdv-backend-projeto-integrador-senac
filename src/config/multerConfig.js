// import multer from 'multer';
const multer = require('multer');
const { extname, resolve } = require('path');


const random = () => Math.floor(Math.random() * 10000 + 10000)

module.exports = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError("File type not allowed"));
        }

        return cb(null, true);
    },
    storage: multer.diskStorage({

        destination: (req, file, cb) => {
            //primeiro argumento erro
            cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
        },
        // para evitar colisao de nomes ou nomes fora de um dado padrao
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
        }
    })

}

