const Client = require('../model/ClientModel');


class ClientService {

    static async store(name, lastName, email, phone, addressId) {

        try {
            const client = await Client.create({ name, lastName, email, phone, addressId });

            if (!client) {
                throw new Error('Error creating client register: aborted');
            }

            return client;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async index() {

        try {
            const clients = await Client.findAll({
                attributes: ['id','name', 'lastName', 'email', 'phone'],
                order: [['createdAt', 'DESC']]
            });

            if (!clients) {
                throw new Error('Error: clients not found');
            }

            return clients;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async show(id) {

        try {
            const client = await Client.findByPk(id);
            if (!client) {
                throw new Error('Error: client not found');
            }

            return client;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }

    }


    static async update(id, clientToUpdate) {
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                throw new Error('Error: client not found');
            }

            const updated = await client.update(clientToUpdate);

            if (!updated) {
                throw new Error("Error updating client: aborted");
            }

            return updated;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    static async delete(id) {

        try {
            const client = await Client.findByPk(id);

            if (!client) {
                throw new Error('Client not found');
            }

            await client.destroy();

            return true;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

module.exports = ClientService;