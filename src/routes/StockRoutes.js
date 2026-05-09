const { Router} = require('express');
const loginRequired  = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const StockController = require('../controller/stockController');
const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

router.get('/transactions', loginRequired, StockController.transactions);

router.get('/', loginRequired, StockController.index);

router.post('/', loginRequired, jsonBodyRequired, StockController.purchase);

router.get('/:productId', loginRequired, StockController.show);

router.patch('/:productId', loginRequired, jsonBodyRequired, StockController.adjustment);

module.exports = router;


