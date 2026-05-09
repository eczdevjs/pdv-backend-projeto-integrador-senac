const User = require('../model/UserModel');
const AppError = require('../utils/AppError');

class UserService {
    static async store(props) {
        try {

            const { name, lastName, email, phone, password } = props;

            if (!email || !password) {
                throw new AppError("Email and Password are required, either both or one  is missing", 400);
            }

            const newUser = await User.create({ name, lastName, email, phone, password });


            if (!newUser) {
                throw new AppError("Error creating new user: Aborted", 500);
            }

            const response = newUser.toJSON();
            return response;

        } catch (error) {
            throw error;
        }
    }

    static async show(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'lastName', 'email', 'phone']
            });

            if (!user) {
                throw new AppError("User not found", 404);
            }

            return user.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async index() {
        try {
            const users = await User.findAll({ attributes: ['id', 'name', 'lastName', 'email'] });
            if (!users) {
                throw new Error('Error fetching users: aborted');
            }
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, fieldsToUpdate) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Error fetching users: aborted');
            }
            const updated = await user.update(fieldsToUpdate);

            if (!updated) {
                throw new Error("Error updating user: Aborted");
            }

            return updated.toJSON();
        } catch (error) {
            throw error;
        }
    }


    static async softDelete(id) {
        // flag based, not exclud change flag to unavalible or something like that
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Error fetching users: aborted');
            }
            await user.destroy();

        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;