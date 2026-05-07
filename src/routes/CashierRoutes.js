const { Router} = require('express');
const loginRequired  = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const CashierController = require('../controller/cashierController');

const router = new Router();

//Opening cashier
router.post('/', loginRequired, jsonBodyRequired, CashierController.open);

// fechar caixa
router.patch('/:shiftId', loginRequired, CashierController.close);

// obeter uma shift, neste caso necessariamente aberta
router.get('/active',loginRequired, CashierController.getOpenedShift);

// INFORMACAO SOBRE UMA DETERMINADA SESSAO
router.get('/:shiftId', loginRequired, CashierController.getShift);


//DEPOSITO DINHEIRO
router.post('/:shiftId/deposits', loginRequired, CashierController.deposit);

// SAQUE DINHEIRO
router.post('/:shiftId/withdraws', loginRequired, CashierController.withdraw);

// SALDO POR TIPO DE PAGAMENTO
router.get('/:shiftId/balances', loginRequired, CashierController.currentBalances);

//HISTORICO DE TRANSACOES PARA UMA SESSAO DE CAIXA
router.get('/:shiftId/transactions', loginRequired, CashierController.cashierHistory);


module.exports = router;