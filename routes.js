const express = require('express');
const routes = express.Router();

const ProductController = require('./src/controller/productController');
const UserController = require('./src/controller/userController');
const tokenController = require('./src/controller/tokenController');
const loginRequired = require('./src/middlewares/loginRequired');
const ClientController = require('./src/controller/clientController');

const paymentMethodController = require('./src/controller/paymentMethodController');
const orderController = require('./src/controller/orderController');
const shiftController = require('./src/controller/shiftController');
const shiftDepositController = require('./src/controller/shiftDepositController');
const shiftWithdrawController = require('./src/controller/shiftWithdrawController');
const shiftTransactionTypeController = require('./src/controller/shiftTransactionTypeController');
const shiftTransactionController = require('./src/controller/shiftTransactionController');
const stockController = require('./src/controller/stockController');
const storeController = require('./src/controller/storeController');
const SaleController = require('./src/controller/saleController');
const jsonBodyRequired = require('./src/middlewares/jsonBodyRequired');



/* PRODUCTS  ROUTES  */
routes.post('/products/register',jsonBodyRequired, ProductController.store);
routes.get('/products/product/:id', ProductController.show);
routes.get('/products/list', ProductController.index);
routes.put('/products/edit/:id',jsonBodyRequired, ProductController.update);
routes.delete('/products/delete/:id', ProductController.delete);






/*USER ROUTES*/ 
routes.post('/users/register',jsonBodyRequired,UserController.store);
// only admins are supposed to see all registered users
routes.get('/users/', loginRequired , UserController.index);
routes.get('/users/user',loginRequired , UserController.show);
routes.put('/users/',loginRequired ,jsonBodyRequired, UserController.update);
// deve ser deletado apenas por adm, se nao for o usuario nao deve excluir o proprio registro, mas pode setar a flag do tipo isActive para falso
routes.delete('/users/',loginRequired , UserController.delete);





//TOKEN ROUTES
routes.post('/tokens/',jsonBodyRequired,tokenController.store);






// CLIENT ROUTES
routes.post('/clients/register/',jsonBodyRequired, ClientController.store);
routes.get('/clients/list/', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.put("/clients/edit/:id",jsonBodyRequired, ClientController.update);
routes.delete("/clients/delete/:id", ClientController.delete);







//PAYMENT METHOD ROUTES: ADMIN ONLY
// Access: loginRequired add or exclude as well admin access.

routes.post('/paymentmethod/register',jsonBodyRequired, paymentMethodController.store)
routes.get('/paymentmethod/list', paymentMethodController.index);
routes.get('/paymentmethod/:id', paymentMethodController.show);
routes.put('/paymentmethod/:id',jsonBodyRequired, paymentMethodController.update);
routes.delete('/paymentmethod/delete/:id', paymentMethodController.delete);






// ORDER ROUTES 
//LOGIN REQUIRED HERE
routes.post('/order/store',jsonBodyRequired, orderController.store);
routes.get('/orders/list', orderController.index);
routes.get('/orders/order/:id', orderController.show);
routes.delete('/orders/delete/:id', orderController.delete);







//SHIFT ROUTES
routes.post('/shifts/open',jsonBodyRequired, shiftController.open);
// O ideal e que haja um metodo shiftContoler.closeShift() que recebe um shiftId como parametro na url , usa o metodo update 
routes.patch('/shifts/close/',jsonBodyRequired, shiftController.close)








// !!!!!!!!!!!!!!!!!!THIS ENDPOINT SHOULD NOT BE KEPT
// SHIFT DEPOSIT ROUTES : TEST ONLY, THIS ENDPOINT SHOULD NOT EXIST
routes.post('/shift/deposit',jsonBodyRequired, shiftDepositController.store);
routes.post('/shift/withdraw',jsonBodyRequired, shiftWithdrawController.store);






/*!!!!!! ADMIN ONLY!!!!!!!!!!!!! */
//SHIFT TRANSACTION TYPE ROUTES
routes.post('/shift/shifttransactiontype/register',jsonBodyRequired, shiftTransactionTypeController.store);
routes.get('/shift/shifttransactiontype/list', shiftTransactionTypeController.index);






// SALE ROUTES

routes.post('/sales/create', jsonBodyRequired,SaleController.createSale);
routes.get('/sales/list/daily', SaleController.getDailySales);
routes.get('/sales/:id', SaleController.getSale);







// ********************     SHIFT TRANSACTIONS ROUTE    ********************************************
// every transaction of shift, Sale, Deposit, Withdraw, Refund
// routes.post('/shift-transaction/sale', shiftTransactionController.createSaleTransaction);
routes.post('/shift-transactions/withdraw',jsonBodyRequired, shiftTransactionController.createWithdrawTransaction);
routes.post('/shift-transactions/deposit', jsonBodyRequired,shiftTransactionController.createDepositTransaction);
routes.get('/shift-transactions/list', shiftTransactionController.index);









// STORE ROUTES
routes.post('/store/register/',jsonBodyRequired, storeController.store);
routes.get('/store/list', storeController.index);








// STOCK ROUTES
routes.post('/stock/purchase/register',jsonBodyRequired, stockController.purchase);
routes.put('/stock/adjustment/',jsonBodyRequired, stockController.adjustment);
routes.get('/stock/list/', stockController.index);
routes.get('/stock/product/:id', stockController.show);
routes.get('/stock/transactions/', stockController.transactionsByDay);
routes.post('/stock/transference/register',jsonBodyRequired, stockController.transference);

// pending testing it
routes.get('/stock/transactions/filterbydate', stockController.transactionsBetweenTwoDates);


module.exports = routes;

