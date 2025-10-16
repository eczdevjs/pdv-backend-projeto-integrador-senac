const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Product = require('../model/ProductModel');
const User = require('../model/UserModel');
const Client = require('../model/ClientModel');
const PaymentMethod = require('../model/PaymentMethod');
const Order = require('../model/OrderModel');
const Suborder = require('../model/SuborderModel');
const Shift = require('../model/ShiftModel');
const ShiftDeposit = require('../model/ShiftDepositModel');
const ShiftWithdraw = require('../model/ShiftWithdrawModel');
const ShiftTransactionType = require('../model/ShiftTransactionType');
const ShiftTransaction = require('../model/ShiftTransactionModel');
const Stock = require('../model/StockModel');
const StockTransactionType = require('../model/StockTransactionTypeModel');
const StockReferenceType = require('../model/StockReferenceTypeModel');
const StockTransaction = require('../model/StockTransactionModel');
const StockAdjustment = require('../model/StockAdjustmentModel');
const Provider = require('../model/ProviderModel');
const PurchaseOrder = require('../model/PurchaseOrderModel');
const  PurchaseLine = require('../model/PurchaseLineModel');
const Store = require('../model/StoreModel');
const StockTransfer = require('../model/StockTransfer');
const StockTransferLine = require('../model/StockTransferLine');


const models = [
    Product,
    User,
    Client,
    PaymentMethod,
    Order,
    Suborder,
    Shift,
    ShiftDeposit,
    ShiftWithdraw,
    ShiftTransactionType,
    ShiftTransaction,
    Stock,
    StockTransactionType,
    StockReferenceType,
    StockTransaction,
    StockAdjustment,
    Provider,
    PurchaseOrder,
    PurchaseLine,,
    Store,
    StockTransfer,
    StockTransferLine
];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));

// adicionado aqui para sanar o problema de assciacao
//aparentemente este era o problema
models.forEach(model => model.associate && model.associate(connection.models));

module.exports = connection;