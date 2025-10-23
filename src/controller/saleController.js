const SaleService = require('../service/SaleService');

class SaleController {

    static async createSale(req, res) {
        try {

            let keysBody = Object.keys(req.body);

            if (keysBody.length === 0 || keysBody.length < 6) {
                return res.status(404).json({ msg: 'Body requisition is missing or required fields does not match: Aborted' });
            }

            for (let key in req.body) {
                if (!req.body[key]) {
                    return res.status(404).json({ msg: `Required field has null value: ${key} | Aborted` })
                }
            }

            const {
                shiftId,
                clientId,
                userId,
                totalOrder,
                paymentMethodId,
                suborders
            } = req.body

            const saleRecord = await SaleService.createSale(
                shiftId,
                clientId,
                userId,
                totalOrder,
                paymentMethodId,
                suborders
            );

            if (!saleRecord) {
                return res.status(500).json({ msg: 'Error creating sale record, operation aborted' });
            }

            return res.status(201).json(saleRecord);

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error creating sale register'});
        }
    }
}

module.exports = SaleController;




// Sale routes: added SaleController; SaleService : createService implemented; ShiftTransactionTypeEnum implemented