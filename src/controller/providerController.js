const ProviderService = require('../service/ProviderService');
const AppError = require('../utils/AppError');

class ProviderController {

    static async store(req, res, next) {
        try {
            const { name, cnpj, email, phone, notes } = req.body;

            if(!name){
                throw new AppError('Required field name is missing', 400);
            }

            const provider = await ProviderService.store({ name, cnpj, email, phone, notes });

            return res.status(201).json(provider);
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const providers = await ProviderService.index();
            return res.status(200).json(providers);
        } catch (error) {
            next(error);
        }
    }


    static async show(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("Id paramether is required", 400)
            }
            const { id } = req.params;
            const provider = await ProviderService.show(id);

            res.status(200).json(provider);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("id paramether is missing", 400);
            }
            const providerToUpdate = req.body;
            const { id } = req.params;
            const updated = await ProviderService.update(id, providerToUpdate);
            return res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    static async softDelete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("id paramether is missing", 400);
            }

            const { id } = req.params;
            const success = await ProviderService.softDelete(id);

            if (!success) {
                throw new AppError("Error deleting register: aborted", 500);
            }

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async deletedIndex(req, res, next) {
        try {

            const deleteds = await ProviderService.deletedIndex();

            return res.status(200).json(deleteds);

        } catch (error) {
            next(error);
        }

    }

    static async restore(req, res, next) {
        try {
            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                throw new AppError("id paramether is missing", 400);
            }

            const { id } = req.params;
            const provider = await 
            ProviderService.restore(id);
            if (!provider) {
                throw new AppError("Error deleting register: aborted", 500);
            }

            return res.status(200).json(provider);
        } catch (error) {
            next(error);
        }
    }



}

module.exports = ProviderController;