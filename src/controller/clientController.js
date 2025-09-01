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

    async index(req, res){
        try {

            const clients = await Client.findAll();
            if(!clients){
                return res.status(404).json({message: 'client list empty  or not found'})
            }

            return res.status(200).json(clients);

        } catch (error) {
            res.status(400).json(error);
        }
    }

    async show(){

    }
    
    async update(){

    }

    async delete(){

    }

}



module.exports = new ClientController();