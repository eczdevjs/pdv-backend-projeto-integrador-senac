const StoreService = require('../service/StoreService');


class StoreController {

    async store(req, res) {

        try {

            if (!req.body || Object.keys(req.body) == 0) {
                console.log('entrou no if')
                return res.status(422).json({ msg: 'Body requisition is missing' })
            }

            const { name, cnpj, phone } = req.body;


            if (!name) {
                return res.status(400).json({ msg: 'required name field is missing' })
            }


            console.log({ name, cnpj, phone })
            const store = await StoreService.store({ name, cnpj, phone });
            console.log(store)

            if (!store) {
                return res.status(500).json({ msg: "error creating store register" });
            }

            return res.status(201).json(store);

        } catch (error) {
            console.log(error);
            res.status(500).json(error.message)
        }


    } 

    async index(req, res) {

        try {

            const stores = await StoreService.index();

            if(!stores){
                return res.status(500).json({msg: 'error fetching stores'})
            }

            return res.status(200).json(stores);

        } catch (error) {
            return res.status(500).json({msg: 'error fetching stores'})
        }
    }

    // update

    // delete

}



module.exports = new StoreController();