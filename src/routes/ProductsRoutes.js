const { Router } = require("express");
const loginRequired = require('../middlewares/loginRequired');
const jsonBodyRequired = require("../middlewares/jsonBodyRequired");
const ProductController = require('../controller/productController')


const router = new Router();

router.get('/archiveds', loginRequired, ProductController.deletedIndex);

router.post('/', loginRequired, jsonBodyRequired, ProductController.store);


router.get('/', loginRequired, ProductController.index);

router.get('/:id', loginRequired, ProductController.show);

router.put('/:id', loginRequired, jsonBodyRequired, ProductController.update);

router.delete('/:id', loginRequired, ProductController.softDelete);

router.patch('/:id/restore', loginRequired, ProductController.restore);


module.exports = router;