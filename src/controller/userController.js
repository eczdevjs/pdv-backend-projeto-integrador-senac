const User = require('../model/UserModel');

class UserController {
    async store(req, res) {
        try {
            if (!req.body) {
                console.log("body request is required");
                console.log(req.body);
               return res.status(400).json({message: "body request is required"});
            }
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);

        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }
}

module.exports = new UserController();