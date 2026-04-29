const Provider = require('../model/ProviderModel');
const AppError = require('../utils/AppError');

class ProviderService {

    static async index() {

        try {
            console.log("ProviderService Index method called !!!!!!!!!!!")
            const providers = await Provider.findAll({
                attributes: ['id', 'name', 'cnpj', 'email', 'phone'],
                order: [['name', 'ASC']]
            });

            if (!providers) {
                throw new Error('Error: products not found');
            }

            return providers;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    // static async show(id) {

    //     try {
    //         const product = await Product.findOne({
    //             where: {
    //                 id,
    //                 isDeleted: false
    //             }
    //         });
    //         if (!product) {
    //             throw new AppError('Product not found');
    //         }
    //         return product;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}

module.exports = ProviderService;