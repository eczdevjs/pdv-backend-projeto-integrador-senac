require('dotenv').config();
const express = require('express');
const routes = express.Router();
const { resolve } = require('path');
const cors = require('cors');
const helmet = require('helmet');

require('./src/database/connection');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/utils/logger')
const morgan = require('morgan');
const multer = require('multer');
const multerConfig = require('./src/config/multerConfig');
const ProductRoutes = require('./src/routes/ProductsRoutes');
const ClientRoutes = require('./src/routes/ClientsRoutes');
const TokenRoutes = require('./src/routes/TokenRoutes');
const StockRoutes = require('./src/routes/StockRoutes');
const CashierRoutes = require('./src/routes/CashierRoutes');
const SaleRoutes = require('./src/routes/SalesRoutes');
const UserRoutes= require('./src/routes/UserRoutes');




class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandle();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
      
        morgan.token('user-id', (req) => req.userId || 'Guest');
        this.app.use(morgan(':method :url :status :user-id - :response-time ms'));

        this.app.use(express.static(resolve(__dirname, 'uploads')));
        logger.info('Middleware initialized');
    }

    routes() {
        this.app.use('/products', ProductRoutes);
        this.app.use('/clients', ClientRoutes );
        this.app.use('/', TokenRoutes);
        this.app.use('/stock', StockRoutes);
        this.app.use('/cashier', CashierRoutes);
        this.app.use('/sales', SaleRoutes);
        this.app.use('/users', UserRoutes);
    }

    errorHandle() {
        this.app.use(errorHandler);
    }
}

module.exports = new App().app;





















// const ProductController = require('./src/controller/productController');
// const UserController = require('./src/controller/userController');
// const tokenController = require('./src/controller/tokenController');
// const loginRequired = require('./src/middlewares/loginRequired');
// const ClientController = require('./src/controller/clientController');
// const PaymentMethodController = require('./src/controller/paymentMethodController');
// const orderController = require('./src/controller/orderController');
// const CashierController = require('./src/controller/cashierController');

// const StockController = require('./src/controller/stockController');
// const storeController = require('./src/controller/storeController');
// const SaleController = require('./src/controller/saleController');
// const jsonBodyRequired = require('./src/middlewares/jsonBodyRequired');
// const Product = require('./src/model/ProductModel');
// const ProviderController = require('./src/controller/providerController');





// //Provider routes

// routes.get('/providers', loginRequired, ProviderController.index);





// /*USER ROUTES*/
// routes.post('/users/create/', jsonBodyRequired, UserController.store);
// // only admins are supposed to see all registered users
// routes.get('/users/', loginRequired, UserController.index);
// routes.get('/users/user', loginRequired, UserController.show);
// routes.put('/users/update', loginRequired, jsonBodyRequired, UserController.update);
// // deve ser deletado apenas por adm, se nao for o usuario nao deve excluir o proprio registro, mas pode setar a flag do tipo isActive para falso
// routes.delete('/users/', loginRequired, UserController.delete);



// //PAYMENT METHOD ROUTES: ADMIN ONLY
// // Access: loginRequired add or exclude as well admin access.

// routes.post('/paymentmethod/register', jsonBodyRequired, PaymentMethodController.store)
// routes.get('/paymentmethod/list', loginRequired, PaymentMethodController.index);
// routes.get('/paymentmethod/:id', PaymentMethodController.show);
// routes.put('/paymentmethod/:id', jsonBodyRequired, PaymentMethodController.update);
// routes.delete('/paymentmethod/delete/:id', PaymentMethodController.delete);


// // // STORE ROUTES
// // routes.post('/store/register/', jsonBodyRequired, storeController.store);
// // routes.get('/store/list', storeController.index);
// // pending testing it
// // routes.get('/stock/transactions/filterbydate', StockController.transactionsBetweenTwoDates);


// // Providers routes


// //Photo routes


// //add login required
// // upload deve ser configurado para receber um arquivo ou varios podeser adicionado em qualquer rota
// routes.post('/photos/product/:productId',loginRequired, PhotoController.store)



// module.exports = routes;

