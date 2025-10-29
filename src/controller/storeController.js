const StoreService = require('../service/StoreService');

const AppError = require('../utils/AppError');
class StoreController {

    async store(req, res, next) {

        try {
            const { name, cnpj, phone } = req.body;
            if (!name) {
                throw new AppError("name field is required, it's missing", 400);
            }
            const store = await StoreService.store({ name, cnpj, phone });
            console.log(store)
            if (!store) {
                throw new AppError("Error creating store register, aborted", 500);
            }
            return res.status(201).json(store);
        } catch (error) {
            next(error);
        }
    }

    async index(req, res, next) {

        try {
            const stores = await StoreService.index();
            if (!stores) {
                throw new AppError("Error fetching stores", 500);
            }
            return res.status(200).json(stores);
        } catch (error) {
            next(error);
        }
    }
    // update
    // delete
}

module.exports = new StoreController();