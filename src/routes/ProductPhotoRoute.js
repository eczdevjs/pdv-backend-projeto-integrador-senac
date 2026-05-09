const { Router } = require('express');
const loginRequired = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const PhotoController = require('./../controller/PhotoController');


const router = new Router();

router.post('/product/:productId', loginRequired, PhotoController.store);

// router.get('/', loginRequired, PhotoController.show);

// router.put('/', loginRequired, jsonBodyRequired, PhotoController.update);

// Admin Only
// router.get('/index', loginRequired, PhotoController.index);

// router.get('/archiveds', loginRequired, PhotoController.deletedIndex);

// router.patch('/:id/restore', loginRequired, PhotoController.restore);

// router.delete('/:id', loginRequired, PhotoController.softDelete);

module.exports = router;

