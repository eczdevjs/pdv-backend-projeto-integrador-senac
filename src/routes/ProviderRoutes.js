const { Router} = require('express');
const loginRequired  = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const ProviderController = require('../controller/providerController');
const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

router.get('/archiveds', loginRequired, ProviderController.deletedIndex);

router.get('/', loginRequired, ProviderController.index);


router.post('/', loginRequired, jsonBodyRequired, ProviderController.store);

router.get('/:id', loginRequired, ProviderController.show);

router.put('/:id', loginRequired, jsonBodyRequired, ProviderController.update);

router.patch('/:id/restore',loginRequired, ProviderController.restore);

router.delete('/:id', loginRequired, ProviderController.softDelete);



module.exports = router;