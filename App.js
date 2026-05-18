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
const ProductPhotoRoute = require('./src/routes/ProductPhotoRoute');
const ProviderRoutes = require('./src/routes/ProviderRoutes');
const PaymentMethodRoutes =  require ('./src/routes/PaymentMethodRoutes');


class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandle();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(helmet({
            crossOriginResourcePolicy: {policy: 'cross-origin'}
        }));
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
        this.app.use('/photos', ProductPhotoRoute);
        this.app.use('/providers', ProviderRoutes);
        this.app.use('/payment-methods', PaymentMethodRoutes)
    }

    errorHandle() {
        this.app.use(errorHandler);
    }
}

module.exports = new App().app;
