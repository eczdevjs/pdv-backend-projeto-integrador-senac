const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController');
const tokenController = require('./src/controller/tokenController');
const loginRequired = require('./src/middlewares/loginRequired');
const clientContrller = require('./src/controller/clientController');
const clientController = require('./src/controller/clientController');
const paymentMethodController = require('./src/controller/paymentMethodController');
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

// Client routes

routes.post('/clients/register/', clientContrller.store);
routes.get('/clients/list/', clientController.index);
routes.get('/clients/:id', clientController.show);
routes.put("/clients/edit/:id", clientController.update)
routes.delete("/clients/delete/:id", clientController.delete)

//Payment method routes
// Access: loginRequired add or exclude as well admin access.
routes.post('/paymentmethod/register', paymentMethodController.store)
routes.get('/paymentmethod/list', paymentMethodController.index);
routes.get('/paymentmethod/:id', paymentMethodController.show);
routes.put('/paymentmethod/:id', paymentMethodController.update);
routes.delete('/paymentmethod/delete/:id', paymentMethodController.delete);




module.exports = routes;