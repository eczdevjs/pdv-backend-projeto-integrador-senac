const UserService = require('../service/UserService');

class UserController {
    // adming required []
    static async store(req, res) {
        try {
            const { name, lastName, email, phone, password } = req.body;
            const newUser = await UserService.store(name, lastName, email, phone, password);
            if (!newUser) {

                return res.status(400).json({ msg: 'Error creating user , aborted' });
            }
            res.status(201).json(newUser);
        } catch (e) {
            switch (e.name) {
                case "SequelizeUniqueConstraintError":
                    return res.status(400).json({ msg: "User email has already been registered" });
                    break;
                case "SequelizeValidationError":
                    return res.status(400).json({msg: "verify sent data: missing required data"})
                default: return res.status(500).json({msg: 'Unexpected server error while creating user'});
            }
        }
    }

    //  adminRequired []
    static async index(req, res) {
        try {
            const users = await UserService.index();
            if (!users) {
                return res.status(400).json(e);
            }
            return res.status(200).json(users);

        } catch (e) {
            console.log("Error fetching users : ", e);
            res.status(400).json(e);
        }
    }
    // login required [x]
    static async show(req, res) {
        try {

            if (!req.userId) {
                return res.status(400).json({ message: "user id is required" });
            }

            const id = req.userId;

            const user = await UserService.show(id);

            if (!user) {
                return res.status(400).json({
                    message: "Error fetching user",
                    error: "user not found"
                });
            }

            return res.status(200).json(user);

        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }
    // login required alterar rota [x]
    static async update(req, res) {
        try {

            if (!req.userId) {
                return res.status(400).json({ message: "user id is required, token expired" });
            }

            if (req.body.password === '') {
                return res.status(400).json(
                    { message: "password can not be null" }
                );
            }

            const is = req.userId;
            const toUpdate = req.body;

            const updatedUser = await UserService.update(id, toUpdate);

            if (!updatedUser) {
                return res.status(400).json(
                    { message: "Error updating  user" }
                );
            }

            return res.status(200).json(updatedUser);
        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }
    }
    // admin required
    static async delete(req, res) {
        try {

            if (!req.params.id) {
                return res.status(400).json({ message: "user id is required" });
            }
            const id = req.params.userId;
            await UserService.delete(id);
            return res.status(204).send();
        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }

}

module.exports = UserController;