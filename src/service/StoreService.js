const Store = require('../model/StoreModel');


class StoreService {

    static async store({ name, cnpj, phone }) {

        try {

            const register = await Store.create({ name, cnpj, phone });
            console.log(register)
            if (!register) {
                throw new Error("Error creating store register: Aborted");
            }
            return register;

        } catch (error) {
            console.log(error);
            throw new Error( `Error creating store register: ${error.message}`)
        }
    }


    static async index() {
        try {

            const stores = await Store.findAll();

            if (!stores) {
                throw new Error('error fetching stores')
            }
            return stores;
        } catch (error) {

            console.log(error);
            throw new Error('Database error while fetching stores: ', error);
        }

    }

    //update

    // delete
}


module.exports = StoreService;