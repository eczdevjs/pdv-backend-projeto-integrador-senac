const { Router } = require('express');
const loginRequired = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const SaleController = require('../controller/saleController');
const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

// registrar uma venda
router.post('/', loginRequired, jsonBodyRequired, SaleController.createSale);

// todas as vendas da sessao atual do caixa, que deve ser flexivel para filtra por parametro (shiftId= vendas caixa atual/filtros data)
router.get('/', loginRequired, SaleController.index);

router.get('/ranking', loginRequired, SaleController.productSaleRanking);




//detalhes de uma venda testado OK
router.get('/:saleId', loginRequired, SaleController.show);

module.exports = router;