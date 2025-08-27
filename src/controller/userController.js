const User = require('../model/UserModel');

class UserController {
    async store(req, res) {
        try {
            const newUser = await User.create({
                name: "Claud",
                lastName: "Shannon",
                email: "cshannon@gmail.com",
                phone: '11956442547',
                password: "123456",
            });
            res.status(201).json(newUser);

        } catch (e) {
            console.log("Error creating user: ",e);
            res.status(400).json(e);
        }

    }
}

module.exports = new UserController();