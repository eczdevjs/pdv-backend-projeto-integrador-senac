const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const App = require('../../App');


class TokenController {
    async store(req, res) {
        try {
            const { email = '', password = '' } = req.body;
            if (!email || !password) {
                throw new AppError("Password or email not provided",  401)
            }
            console.log({ email, password });

            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new AppError("User not found", 404);
            }

            if (!(await user.validatePassword(password))) {
                throw new AppError("Password or email incorrect", 400);
            }

            const { id } = user;
            const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });

            return res.status(200).json({token: token, user});

        } catch (e) {
            throw e;
        }
    }
}

module.exports = new TokenController();