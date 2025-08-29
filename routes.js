const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController');
const tokenController = require('./src/controller/tokenController');
const loginRequired = require('./src/middlewares/loginRequired');
const routes = express.Router();



routes.get('/', productController.store);

//user routes
routes.post('/users/',userController.store);
routes.get('/users/', loginRequired , userController.index);
routes.get('/users/user',loginRequired , userController.show);
routes.put('/users/',loginRequired , userController.update);
// deve ser deletado apenas por adm, se nao for o usuario nao deve excluir o proprio registro, mas pode setar a flag do tipo isActive para falso
routes.delete('/users/',loginRequired , userController.delete);

//token routes
routes.post('/tokens/', tokenController.store);

module.exports = routes;