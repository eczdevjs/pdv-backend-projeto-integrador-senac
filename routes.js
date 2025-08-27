const express = require('express');
const productController = require('./src/controller/productController');
const routes = express.Router();

console.log("productController");
console.log(productController);

routes.get('/', productController.store);

module.exports =  routes;