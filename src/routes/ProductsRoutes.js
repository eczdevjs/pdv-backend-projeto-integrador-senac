const  { Router }  = require( "express");
const loginRequired = require('../middlewares/loginRequired');
const jsonBodyRequired = require("../middlewares/jsonBodyRequired");

const ProductController = require('../controller/productController')



const router = new Router();

router.post('/create/',loginRequired, jsonBodyRequired, ProductController.store);
router.get('/deleted/index/',loginRequired, ProductController.getAllDeleted);
router.get('/',loginRequired, ProductController.index);
router.get('/:id',loginRequired, ProductController.show);
router.put('/edit/:id',loginRequired, jsonBodyRequired, ProductController.update);
router.delete('/delete/:id',loginRequired, ProductController.delete);
router.patch('/restore/:id',loginRequired, ProductController.restore);


module.exports = router;