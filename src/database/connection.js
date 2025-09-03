const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Product = require('../model/ProductModel');
const User = require('../model/UserModel');
const Client = require('../model/ClientModel');
const PaymentMethod = require('../model/PaymentMethod');

const models = [Product, User, Client, PaymentMethod];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));