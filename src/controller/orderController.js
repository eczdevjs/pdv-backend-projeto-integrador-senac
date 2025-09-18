const Order = require('../model/OrderModel');
const Client = require('../model/ClientModel');
const User  = require('../model/UserModel');
const PaymentMethod = require('../model/PaymentMethod');
const Suborder = require('../model/SuborderModel');

class OrderController {
    async store(req, res) {
        console.log(req.body);
        if(!req.body){
            return res.status(400).json({msg: "body order missing"})
        }

        try {
            const order = await Order.create(req.body, {
                include:[{
                    model: Suborder,
                    as:'suborders'
                }]
            });
            
            if (!order) {
                return res.status(401).json({ msg: "error creating order" });
            }
            return res.status(201).json(order);

        } catch (error) {
            console.log(error);
            res.status(402).json(error);
        }

    }

    async index(req, res) {
        try {
            const orders = await Order.findAll({
                attributes: ['id', 'totalOrder', 'createdAt'],
                include:[{
                    model: Client,
                    as: 'client',
                    attributes: ['id','name', 'lastName']
                },{
                    model: User,
                    as: 'user',
                    attributes: ['id','name']
                },{
                    model: PaymentMethod,
                    as: 'paymentMethod',
                    attributes: ['name']
                },{
                    model: Suborder,
                    as: 'suborders'
                    // include: ['']
                }] 
            });


            console.log("orders: ",orders);


            if (!orders) {
                return res.json({ message: 'order list empty  or not found' })
            }

            return res.json(orders);

        } catch (error) {
            console.log(error);

            res.json(error);
        }
    }

    async show(req, res) {
        try {
            if (!req.params.id) {
                req.status(400).json({ msg: "Id paramether required" });
            }

            const order = await Order.findByPk(req.params.id, {
                attributes: ['id', 'totalOrder','createdAt'],
                include:[{
                    model: Client,
                    as: 'client',
                    attributes: ['id','name', 'lastName']
                },{
                    model: User,
                    as: 'user',
                    attributes: ['id','name']
                },{
                    model: PaymentMethod,
                    as: 'paymentMethod',
                    attributes: ['name']
                }] 
            });

            if (!order) {
                res.status(404).json({ msg: "Client not foud" });
            }

            res.status(200).json(order);


        } catch (error) {
            res.status(400).json(error);
        }
    }

// atualizar os dados de um pedido pode acarretar em inconsistencia, estudar como implementar 

    async update(req, res) {
        if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: "Client not foud" });
        }

       const updated = await order.update(req.body);

       return res.status(200).json(updated);
    }


    async delete(req, res) {
          if (!req.params.id) {
           return req.status(400).json({ msg: "Id paramether required" });
        }

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: "Client not foud" });
        }

        await order.destroy();

       return res.status(204).json({msg: "Client deleted"});
    }

}



module.exports = new OrderController();