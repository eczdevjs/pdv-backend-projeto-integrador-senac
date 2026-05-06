const { Router} = require('express');
const loginRequired  = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const ClientController = require('../controller/clientController');
const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

router.get('/archiveds', loginRequired, ClientController.deletedIndex);


router.get('/', loginRequired, ClientController.index);
router.post('/', loginRequired, jsonBodyRequired, ClientController.store);

router.get('/:id', loginRequired, ClientController.show);

router.put('/:id', loginRequired, jsonBodyRequired, ClientController.update);
router.patch('/:id/restore',loginRequired, ClientController.restore);
router.delete('/:id', loginRequired, ClientController.softDelete);



module.exports = router;