const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController')
const routes = express.Router();



routes.get('/', productController.store);
routes.get('/users/', userController.store);

module.exports =  routes;