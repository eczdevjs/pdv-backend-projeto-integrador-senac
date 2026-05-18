const { Router} = require('express');
const loginRequired  = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const PaymentMethodController = require('../controller/paymentMethodController');
const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

// router.get('/archiveds', loginRequired, PaymentMethodController.deletedIndex);

router.get('/', loginRequired, PaymentMethodController.index);

// router.post('/', loginRequired, jsonBodyRequired, PaymentMethodController.store);

// router.get('/:id', loginRequired, PaymentMethodController.show);

// router.put('/:id', loginRequired, jsonBodyRequired, PaymentMethodController.update);

// router.patch('/:id/restore',loginRequired, PaymentMethodController.restore);

// router.delete('/:id', loginRequired, PaymentMethodController.softDelete);



module.exports = router;