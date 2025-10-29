const User = require('../model/UserModel');

class UserService {
    static async store(name, lastName, email, phone, password) {
        try {
            const newUser = await User.create({ name, lastName, email, phone, password });
            if (newUser) {
                return newUser;
            }
        } catch (error) {
            throw error;
        }
    }
    static async show(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Error creating user: aborted');
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
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
            throw new Error(error.message);
        }
    }
    static async update(id, user) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Error fetching users: aborted');
            }
            const updated = await user.update(user);

            if (!updated) {
                throw new Error("Error updating user: Aborted");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        // flag based, not exclud change flag to unavalible or something like that
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Error fetching users: aborted');
            }
            await user.destroy();

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserService;