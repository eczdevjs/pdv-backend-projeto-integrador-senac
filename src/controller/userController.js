const UserService = require('../service/UserService');
const AppError = require('../utils/AppError');

class UserController {
    // adming required []
    static async store(req, res, next) {
        try {
            const { name, lastName, email, phone, password } = req.body;
            const newUser = await UserService.store({ name, lastName, email, phone, password });
            if (!newUser) {
                throw new AppError("Error creating user")
            }

            res.status(201).json({
                success: true,
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    createdAt: newUser.createdAt
                },
                errors: null
            });

        } catch (e) {
            next(e)
        }
    }


    //  adminRequired []
    static async index(req, res, next) {
        try {
            const users = await UserService.index();
            if (!users) {
                return res.status(400).json(e);
            }
            return res.status(200).json(users);

        } catch (e) {
            next(e);
        }
    }

    // login required [x]
    static async show(req, res, next) {
        try {

            if (!req.userId) {
                return res.status(400).json({ message: "user id is required" });
            }

            const id = req.userId;

            const user = await UserService.show(id);

            if (!user) {
                throw new AppError("User not found", 404);
            }

            return res.status(200).json(user);

        } catch (e) {
            next(e);
        }

    }
    // login required alterar rota [x]
    static async update(req, res, next) {
        try {

            if (!req.userId) {
                throw new AppError("User id required: It's missing");
            }

            if (req.body.password && req.body.password === '') {
                throw new AppError("Password can not be null", 400);
            }

            const id = req.userId;
            const toUpdate = req.body;

            const updatedUser = await UserService.update(id, toUpdate);

            if (!updatedUser) {
                throw new AppError('Error updating user: aborted', 500);
            }

            const response = {
                success: true,
                data: {
                    name: updatedUser.name,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    updatedAt: updatedUser.updatedAt
                },
                errors: null
            }

            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    // admin required
    static async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new AppError("Required paramether (id) is missing");
            }
            const id = req.params.userId;
            await UserService.delete(id);
            return res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = UserController;