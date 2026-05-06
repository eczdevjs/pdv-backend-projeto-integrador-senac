const Client = require('../model/ClientModel');
const AppError = require('../utils/AppError');
const { Op } = require('sequelize');

class ClientService {

    static async store(name, lastName, email, phone, addressId) {

        try {
            const client = await Client.create({ name, lastName, email, phone, addressId });

            if (!client) {
                throw new AppError('Error creating client register: aborted', 501);
            }

            return client;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static async index() {

        try {
            const clients = await Client.findAll({
                attributes: ['id', 'name', 'lastName', 'email', 'phone'],
                order: [['createdAt', 'DESC']]
            });

            return clients;
        } catch (error) {
            console.log(error);
            throw new error;
        }
    }

    static async show(id) {

        try {

            const client = await Client.findByPk(id);

            if (!client) {
                throw new AppError('Error: client not found', 404);
            }

            return client;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    static async update(id, clientToUpdate) {
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                throw new AppError('Error: client not found', 404);
            }

            const updated = await client.update(clientToUpdate);

            return updated;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    //soft deletion using sequelize paranoid;
    static async softDelete(id) {

        try {
            const client = await Client.findByPk(id);

            if (!client) {
                throw new AppError('Client not found', 404);
            }

            await client.destroy();

            return true;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    static async deletedIndex() {
        try {
            const deleteds = await Client.findAll({
                where: {
                    deleted_at: {
                        [Op.not]: null
                    }
                },
                paranoid: false
            });

            return deleteds;

        } catch (error) {
            throw error;
        }

    }

    static async restore(id) {

        try {
            const client = await Client.findByPk(id, { paranoid: false });

            if (!client) {
                throw new AppError('Client not found', 404);
            }

            await client.restore();

            return client;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}


module.exports = ClientService;