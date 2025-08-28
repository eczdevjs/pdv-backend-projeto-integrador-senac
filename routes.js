const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController')
const routes = express.Router();



routes.get('/', productController.store);
routes.post('/users/', userController.store);

module.exports =  routes;