const ClientService = require('../service/ClientService');
const AppError = require('../utils/AppError');

class ClientController {

    static async store(req, res, next) {
        try {
            const { name, lastName, email, phone, addressId } = req.body;
            const client = await ClientService.store(name, lastName, email, phone, addressId);

            if (!client) {
                throw new AppError("Error creating client", 500);
            }
            return res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const clients = await ClientService.index();
            if (!clients) {
                throw new AppError("Clients not found", 404);
            }
            return res.status(200).json(clients);
        } catch (error) {
            next(error);
        }
    }


    static async show(req, res, next) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }
            const { id } = req.params;
            const client = await ClientService.show(id);
            if (!client) {
                throw new AppError("Client not found", 404);
            }
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
            if (!updated) {
                throw new AppError("Error updating register, aborted", 500);
            }
            return res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("id paramether is missing", 400);
            }
            const { id } = req.params;
            const success = await ClientService.delete(id);
            if (!success) {
                throw new AppError("Error deleting register: aborted", 500);
            }
            return res.status(200).json({ msg: 'Register deleted' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClientController;