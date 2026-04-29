// import multer from 'multer';
const multer = require('multer');
const {extname, resolve} = require('path');


const random = ()=> Math.floor(Math.random() * 10000 + 10000)

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            //primeiro argumento erro
            cb(null, resolve(__dirname, '..', '..', 'uploads'));
        },
        // para evitar colisao de nomes ou nomes fora de um dado padrao
        filename: (req, file, cb)=>{
            cb(null, `${Date.now()}${random()}${extname(file.originalname)}`)
        }
    })

}

