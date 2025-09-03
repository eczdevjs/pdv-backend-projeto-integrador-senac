const Client = require('../model/ClientModel');


class ClientController {
    async store(req, res) {
        try {
            const client = await Client.create(req.body);
            if (!client) {
                return res.status(400).json({ msg: "error creating client" });
            }
            return res.status(201).json(client);

        } catch (error) {
            res.status(400).json(error);
        }

    }

    async index(req, res) {
        try {

            const clients = await Client.findAll({attributes: ['name', 'lastName', 'email', 'phone']});
            if (!clients) {
                return res.status(404).json({ message: 'client list empty  or not found' })
            }

            return res.status(200).json(clients);

        } catch (error) {
            res.status(400).json(error);
        }
    }
    // neste caso para localizar cliente o ideal e que possa ser buscado por nome ou outro parametro, eventualmente cpf;
    async show(req, res) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }

            const client = await Client.findByPk(req.params.id);

            if (!client) {
                res.status(404).json({ msg: "Client not foud" });
            }

            res.status(200).json(client);


        } catch (error) {
            res.status(400).json(error);
        }
    }

    async update(req, res) {
        if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ msg: "Client not foud" });
        }

       const updated = await client.update(req.body);

       return res.status(200).json(updated);
    }

    async delete(req, res) {
          if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const client = await Client.findByPk(req.params.id);

        if (!client) {
            return res.status(404).json({ msg: "Client not foud" });
        }

        await client.destroy();

       return res.status(204).json({msg: "Client deleted"});
    }

}



module.exports = new ClientController();