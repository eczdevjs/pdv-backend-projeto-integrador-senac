const express = require('express');
const routes = express.Router();

const ProductController = require('./src/controller/productController');
const UserController = require('./src/controller/userController');
const tokenController = require('./src/controller/tokenController');
const loginRequired = require('./src/middlewares/loginRequired');
const ClientController = require('./src/controller/clientController');
const PaymentMethodController = require('./src/controller/paymentMethodController');
const orderController = require('./src/controller/orderController');
const CashierController = require('./src/controller/cashierController');

const StockController = require('./src/controller/stockController');
const storeController = require('./src/controller/storeController');
const SaleController = require('./src/controller/saleController');
const jsonBodyRequired = require('./src/middlewares/jsonBodyRequired');
const Product = require('./src/model/ProductModel');



/* PRODUCTS  ROUTES  */
routes.post('/products/create/',jsonBodyRequired, ProductController.store);
routes.get('/products/delete/index/', ProductController.getAllDeleted);

routes.get('/products/', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.put('/products/edit/:id',jsonBodyRequired, ProductController.update);
routes.delete('/products/delete/:id', ProductController.delete);
routes.patch ('/products/restore/:id', ProductController.restore);



// STOCK ROUTES
routes.get('/stock/index/', StockController.index);
routes.post('/stock/purchase/create/',jsonBodyRequired, StockController.purchase);
routes.put('/stock/adjustment/create/',jsonBodyRequired, StockController.adjustment);
routes.get('/stock/product/:id', StockController.show);
routes.get('/stock/transactions/', StockController.transactionsByDay);
routes.post('/stock/transference/create/',jsonBodyRequired, StockController.transference);















// CASHIER ROUTES
routes.post('/cashier/open',loginRequired,jsonBodyRequired, CashierController.open);

routes.patch('/cashier/close/:shiftId',loginRequired, CashierController.close);

routes.get('/cashier/shifts/list', loginRequired, CashierController.filterByDate);

routes.get('/cashier/shifts/:shiftId', loginRequired, CashierController.getShift);

routes.get('/cashier/balances/:shiftId', loginRequired,CashierController.currentBalances);

// deposit
routes.post('/cashier/deposit/:shiftId',loginRequired, CashierController.deposit);
// withdraw
routes.post('/cashier/withdraw/:shiftId',loginRequired, CashierController.withdraw);

routes.get('/cashier/history/:shiftId', loginRequired, CashierController.cashierHistory);







/*USER ROUTES*/ 
routes.post('/users/create/',jsonBodyRequired,UserController.store);
// only admins are supposed to see all registered users
routes.get('/users/', loginRequired , UserController.index);
routes.get('/users/user',loginRequired , UserController.show);
routes.put('/users/update',loginRequired ,jsonBodyRequired, UserController.update);
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

routes.post('/paymentmethod/register',jsonBodyRequired, PaymentMethodController.store)
routes.get('/paymentmethod/list', PaymentMethodController.index);
routes.get('/paymentmethod/:id', PaymentMethodController.show);
routes.put('/paymentmethod/:id',jsonBodyRequired, PaymentMethodController.update);
routes.delete('/paymentmethod/delete/:id', PaymentMethodController.delete);






// ORDER ROUTES 
//LOGIN REQUIRED HERE
routes.post('/order/store',jsonBodyRequired, orderController.store);
routes.get('/orders/list', orderController.index);
routes.get('/orders/order/:id', orderController.show);
routes.delete('/orders/delete/:id', orderController.delete);






                                                                                                                                                                                                                                                                                                                                                                              






/*!!!!!! ADMIN ONLY!!!!!!!!!!!!! */
//SHIFT TRANSACTION TYPE ROUTES
// routes.post('/shift/shifttransactiontype/register',jsonBodyRequired, shiftTransactionTypeController.store);
// routes.get('/shift/shifttransactiontype/list', shiftTransactionTypeController.index);






// SALE ROUTES

routes.post('/sales/create', jsonBodyRequired,SaleController.createSale);
routes.get('/sales/list/daily/:shiftId',loginRequired, SaleController.getDailySales);
routes.get('/sales/:id', SaleController.getSale);





// ********************     SHIFT TRANSACTIONS ROUTE    ********************************************
// // every transaction of shift, Sale, Deposit, Withdraw, Refund
// // routes.post('/shift-transaction/sale', shiftTransactionController.createSaleTransaction);
// routes.post('/shift-transactions/withdraw',jsonBodyRequired, shiftTransactionController.createWithdrawTransaction);
// routes.post('/shift-transactions/deposit', jsonBodyRequired,shiftTransactionController.createDepositTransaction);
// routes.get('/shift-transactions/list', shiftTransactionController.index);









// STORE ROUTES
routes.post('/store/register/',jsonBodyRequired, storeController.store);
routes.get('/store/list', storeController.index);











// pending testing it
routes.get('/stock/transactions/filterbydate', StockController.transactionsBetweenTwoDates);


module.exports = routes;

