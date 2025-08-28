const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController');

const routes = express.Router();



routes.get('/', productController.store);
routes.post('/users/', userController.store);
routes.get('/users/', userController.index);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);


module.exports =  routes;