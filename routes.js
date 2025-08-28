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
routes.get('/users/',loginRequired , userController.show);
routes.put('/users/',loginRequired , userController.update);
routes.delete('/users/',loginRequired , userController.delete);

//token routes
routes.post('/tokens/', tokenController.store);

module.exports =  routes;