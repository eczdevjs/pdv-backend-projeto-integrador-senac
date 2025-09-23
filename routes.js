const express = require('express');
const productController = require('./src/controller/productController');
const userController = require('./src/controller/userController');
const tokenController = require('./src/controller/tokenController');
const loginRequired = require('./src/middlewares/loginRequired');
const clientContrller = require('./src/controller/clientController');
const clientController = require('./src/controller/clientController');
const paymentMethodController = require('./src/controller/paymentMethodController');
const orderController = require('./src/controller/orderController');
const shiftController = require('./src/controller/shiftController');
const shiftDepositController = require('./src/controller/shiftDepositController');
const shiftWithdrawController = require('./src/controller/shiftWithdrawController');
const shiftTransactionTypeController = require('./src/controller/shiftTransactionTypeController');
const shiftTransactionController = require('./src/controller/shiftTransactionController');

const routes = express.Router();


/* PRODUCTS  ROUTES */
routes.post('/products/register', productController.store);
routes.get('/products/product/:id', productController.show);
routes.get('/products/list', productController.index);
routes.put('/products/edit/:id', productController.update);
routes.delete('/products/delete/:id', productController.delete);


/*USER ROUTES*/ 
routes.post('/users/register',userController.store);
// only admins are supposed to see all registered users
routes.get('/users/', loginRequired , userController.index);
routes.get('/users/user',loginRequired , userController.show);
routes.put('/users/',loginRequired , userController.update);
// deve ser deletado apenas por adm, se nao for o usuario nao deve excluir o proprio registro, mas pode setar a flag do tipo isActive para falso
routes.delete('/users/',loginRequired , userController.delete);


//TOKEN ROUTES
routes.post('/tokens/', tokenController.store);


// CLIENT ROUTES

routes.post('/clients/register/', clientContrller.store);
routes.get('/clients/list/', clientController.index);
routes.get('/clients/:id', clientController.show);
routes.put("/clients/edit/:id", clientController.update);
routes.delete("/clients/delete/:id", clientController.delete);


//PAYMENT METHOD ROUTES
// Access: loginRequired add or exclude as well admin access.
routes.post('/paymentmethod/register', paymentMethodController.store)
routes.get('/paymentmethod/list', paymentMethodController.index);
routes.get('/paymentmethod/:id', paymentMethodController.show);
routes.put('/paymentmethod/:id', paymentMethodController.update);
routes.delete('/paymentmethod/delete/:id', paymentMethodController.delete);


// ORDER ROUTES
//LOGIN REQUIRED HERE
routes.post('/order/store', orderController.store);
routes.get('/orders/list', orderController.index);
routes.get('/orders/order/:id', orderController.show);
routes.delete('/orders/delete/:id', orderController.delete);


//SHIFT ROUTES

routes.post('/shifts/open', shiftController.open);
// O ideal e que haja um metodo shiftContoler.closeShift() que recebe um shiftId como parametro na url , usa o metodo update 
routes.patch('/shifts/close/:shiftId', shiftController.close)



// SHIFT DEPOSIT ROUTES

routes.post('/shift/deposit', shiftDepositController.store);
routes.post('/shift/withdraw', shiftWithdrawController.store);


//SHIFT TRANSACTION TYPE ROUTES

routes.post('/shift/shifttransactiontype/register', shiftTransactionTypeController.store);
routes.get('/shift/shifttransactiontype/list', shiftTransactionTypeController.index);


// ********************     SHIFT TRANSACTIONS ROUTE    ********************************************

routes.post('/shift-transaction/sale', shiftTransactionController.createSaleTransaction);
routes.post('/shift-transactions/withdraw', shiftTransactionController.createWithdrawTransaction);
routes.post('/shift-transactions/deposit', shiftTransactionController.createDepositTransaction);

module.exports = routes;

