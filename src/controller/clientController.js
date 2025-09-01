const Client = require('../model/ClientModel');


class ClientController {
    async store(req, res){
        try {
            const client = await Client.create(req.body);
            if(!client){
                return res.status(400).json({msg : "error creating client"});
            }
            return res.status(201).json(client);

        } catch (error) {
            res.status(400).json(error);
        }
    
    }
}



module.exports = new ClientController();