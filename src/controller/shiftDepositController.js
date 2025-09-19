const ShiftDeposit = require('../model/ShiftDepositModel');

class ShiftDepositController {

    async store(req, res) {

        if (!req.body) {
            return res.status(400).json({ msg: 'body requisition is required' });
        }

        try {
            const deposit = await ShiftDeposit.create(req.body);

            if (!deposit) {
                return req.status(409).json({ msg: "Error creating  cashier deposit" });
            }

            return res.status(201).json(deposit);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ msg: 'Error creating register' });

        }
    }

    // async index(req, res) {

    //     try {
    //         const list = await PaymentMethod.findAll({ attributes: ['id', 'name'] });
    //         if (!list) {
    //             return res.status(500).json({ msg: 'Error fetching data' });
    //         }

    //         return res.status(200).json(list);

    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }

    // }

    // async show(req, res) {
    //     if (!req.params.id) {
    //         return res.status(404).json({ msg: 'id paramether missing' });
    //     }

    //     try {
    //         const paymentMethod = await PaymentMethod.findByPk(req.params.id, { attributes: ['id', 'name'] });
    //         if (!paymentMethod) {
    //             return res.status(404).json({ msg: 'Not found' });
    //         }

    //         return res.status(200).json(paymentMethod);

    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ msg: "Error fetching data" });
    //     }

    // }

    // async update(req, res) {

    //     if (!req.params.id) {
    //         return res.status(404).json({ msg: 'id paramether missing' });
    //     }

    //     if (!req.body) {
    //         return res.status(404).json({ msg: 'id paramether missing' });
    //     }

    //     try {
    //         const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    //         if (!paymentMethod) {
    //             return res.status(404).json({ msg: 'Not found' });
    //         }

    //         paymentMethod.update(req.body);

    //         return res.status(200).json({
    //             paymentMethod,
    //             msg: "register update succeed"
    //         });

    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ msg: "Error updating data" });
    //     }

    // }

    // async delete(req, res) {

    //     if (!req.params.id) {
    //         return res.status(404).json({ msg: 'id paramether missing' });
    //     }

    //     try {
    //         const paymentMethod = await PaymentMethod.findByPk(req.params.id);

    //         if (!paymentMethod) {
    //             return res.status(404).json({ msg: 'Not found' });
    //         }

    //         await paymentMethod.destroy();

    //         return res.status(204).json({msg: "Deletion succeed"});

    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ msg: "Error updating data" });
    //     }
    // }
}


module.exports = new ShiftDepositController();