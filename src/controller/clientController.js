const ClientService = require('../service/ClientService');
const AppError = require('../utils/AppError');

class ClientController {

    static async store(req, res, next) {
        try {
            const { name, lastName, email, phone, addressId } = req.body;
            const client = await ClientService.store(name, lastName, email, phone, addressId);

            return res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const clients = await ClientService.index();
            return res.status(200).json(clients);
        } catch (error) {
            next(error);
        }
    }


    static async show(req, res, next) {
        try {
            if (!req.params.id) {
              throw new AppError("Id paramether is required" , 400)
            }
            const { id } = req.params;
            const client = await ClientService.show(id);

            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("id paramether is missing", 400);
            }
            const clientToUpdate = req.body;
            const { id } = req.params;
            const updated = await ClientService.update(id, clientToUpdate);
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
            const success = await ClientService.softDelete(id);

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

            const deleteds = await ClientService.deletedIndex();

            return res.status(200).json(deleteds);

        } catch (error) {
            next(error);
        }

    }

    static async restore(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("id paramether is missing", 400);
            }
            const { id } = req.params;
            const client = await ClientService.restore(id);
            if (!client) {
                throw new AppError("Error deleting register: aborted", 500);
            }
            return res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClientController;