const Stock = require('../model/StockModel');


class StockController {

    async store(req, res){
        if(!req.body){
           return res.status(400).json({msg: 'body requisition is required'});
        }

        const register = await Stock.create(req.body);

        if(!register){
            return res.status(404).json({msg: 'Error creating stock register: Operation aborted'});
        }

        return res.status(201).json(register);
    }

}

module.exports = new StockController();