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
            return res.status(500).json({ msg: 'Error creating sale register' });
        }
    }


    static async getDailySales(req, res) {
        try {
            const { userId, shiftId } = req.body;

            if (!userId || !shiftId) {
                return res.status(400).json({ msg: 'Required field is missing' });
            }

            const orders = await SaleService.dailySales(shiftId, userId);

            if (!orders) {
                return res.status(404).json({ msg: 'Sales record not found' });
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Error fetching sales record' });
        }
    }


    static async getSale(req, res) {
        try {
            const { id } = req.params

            if (!id || isNaN(parseInt(id)) ) {
                return res.status(400).json({ msg: 'Required param is missing or misstyped'});
            }

            const sale = await SaleService.getSale(id);

            if (!sale) {
                return res.status(400).json({ msg: 'Error fetching sale record, sale not found' });
            }

            return res.status(200).json(sale);
        } catch (error) {
            console.log(error);
            res.status(501).json({msg: 'Error fetching data'});
        }
    }
}


module.exports = SaleController;
