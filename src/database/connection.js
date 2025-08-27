const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Product = require('../model/ProductModel');

const models = [Product];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));