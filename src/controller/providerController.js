const ProviderService = require('../service/ProviderService');
const AppError = require('../utils/AppError');

class ProviderController {
  
    static async index(req, res, next) {
        try {
            const list = await ProviderService.index();
            if (!list) {
                throw new AppError("Error fetching store data, aborted", 500);
            }

            if(list.length === 0){
                return   res.status(404).json({msg: 'Stock list is empty'});
            }
            return res.status(200).json(list);
        } catch (error) {
            next(error);
        }
    }

    // static async show(req, res, next) {
    //     try {
    //         const productId = req.params.id;
    //         if (!productId) {
    //             throw new AppError("Product id is required, it's missing, aborted", 500);
    //         }
    //         const stock = await StockService.show(productId);
    //         if (!stock) {
    //             throw new AppError("Product not found", 404);
    //         }
    //         return res.status(200).json(stock);
    //     } catch (error) {
    //         next(error);
    //     }
    // }



}

module.exports =  ProviderController;