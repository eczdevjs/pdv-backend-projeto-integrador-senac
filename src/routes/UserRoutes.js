const { Router } = require('express');
const loginRequired = require('../middlewares/loginRequired');
const jsonBodyRequired = require('../middlewares/jsonBodyRequired');

const UserController = require('./../controller/userController');

const { json } = require('sequelize');
const { log } = require('winston');

const router = new Router();

router.post('/',jsonBodyRequired, UserController.store);

router.get('/', loginRequired, UserController.show);

router.put('/', loginRequired, jsonBodyRequired, UserController.update);


// Admin Only
// router.get('/index', loginRequired, UserController.index);

// router.get('/archiveds', loginRequired, UserController.deletedIndex);

// router.patch('/:id/restore', loginRequired, UserController.restore);

// router.delete('/:id', loginRequired, UserController.softDelete);


module.exports = router;



