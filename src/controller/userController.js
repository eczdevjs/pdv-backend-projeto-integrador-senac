const UserService = require('../service/UserService');
const AppError = require('../utils/AppError');


class UserController {
    // adming required []
    static async store(req, res, next) {
        try {
            const { name, lastName, email, phone, password } = req.body;

            if(!name|| !lastName|| !email|| !phone|| !password){
                throw new AppError("Required fields missing, check parmethers and try again", 400);
            }

            const newUser = await UserService.store({ name, lastName, email, phone, password });

            if (!newUser) {
                throw new AppError("Error creating user")
            }

            res.status(201).json(newUser);

        } catch (e) {
            next(e)
        }
    }

    //  adminRequired []
    static async index(req, res, next) {
        try {
            const users = await UserService.index();
            return res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    static async show(req, res, next) {
        try {

            if (!req.userId) {
                return res.status(400).json({ message: "user id is required" });
            }

            const id = req.userId;

            if(isNaN(parseInt(id))){
                throw new AppError("Required field id mismatch : Aborted",400);
            }

            const user = await UserService.show(id);

            if (!user) {
                throw new AppError("User not found", 404);
            }
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }

    }

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

  
            return res.status(200).json(updatedUser);
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