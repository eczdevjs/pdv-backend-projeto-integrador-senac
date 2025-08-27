const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Product = require('../model/ProductModel');
const User = require('../model/UserModel');

const models = [Product, User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));