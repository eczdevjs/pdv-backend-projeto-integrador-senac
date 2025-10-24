const ClientService = require('../service/ClientService');


class ClientController {

    static async store(req, res) {

        try {

            let bodyKeys = Object.keys(req.body);

            if (bodyKeys.length === 0) {
                return req.status(400).json({ msg: "Body requisition is missing" });
            }

            const { name, lastName, email, phone, addressId } = req.body;

            const client = await ClientService.store(name, lastName, email, phone, addressId);

            if (!client) {
                return res.status(400).json({ msg: "error creating client" });
            }
            return res.status(201).json(client);

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    }


    static async index(req, res) {
        try {

            const clients = await ClientService.index();

            if (!clients) {
                return res.status(400).json({ msg: "Clients not found" });
            }

            return res.status(200).json(clients);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    static async show(req, res) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }
            const { id } = req.params;

            const client = await ClientService.show(id);

            if (!client) {
                return res.status(400).json({ msg: "Clients not found" });
            }

            res.status(200).json(client);

        } catch (error) {
            res.status(400).json(error);
        }
    }


    static async update(req, res) {

        if (!req.params.id) {
            return req.status(400).json({ msg: "Id paramether required" });
        }

        let keysBody = Object.keys(req.body);

        if (keysBody.length === 0) {
            return res.status(404).json({ msg: 'Body requisition is missing : Aborted' });
        }

        const clientToUpdate = req.body;

        const { id } = req.params;

        const updated = await ClientService.update(id, clientToUpdate);

        if (!updated) {
            return res.status(400).json({ msg: "Error updating client: aborted" });
        }

        return res.status(200).json(updated);
    }


    static async delete(req, res) {

        try {

            if (!req.params.id) {
                return req.status(400).json({ msg: "Id paramether required" });
            }

            const { id } = req.params;

            const success = await ClientService.delete(id);

            if (!success) {
                return res.status(500).json({ msg: "Error deleting client: aborted" });
            }

            return res.status(200).json({msg: 'Register deleted'});

        } catch (error) {
            console.log(error.message);
            if(error.message == 'Client not found'){
                res.status(404).json({msg: 'client not found, check id paramether'});
            }

            res.status(500).json({msg: error.messsage});
        }
    }
}

module.exports = ClientController;