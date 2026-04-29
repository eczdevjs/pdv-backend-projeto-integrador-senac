const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
class TokenController {
    async store(req, res) {
        try {
            const { email = '', password = '' } = req.body;
            if (!email || !password) {
                return res.status(401).json({ msg: "Password or email not provided" })
            }
            console.log({ email, password });

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            if (!(await user.validatePassword(password))) {
                return res.status(401).json({ msg: "Password or email not found" });
            }

            const { id } = user;
            const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });

            return res.status(200).json({token: token, user});


        } catch (e) {
            res.json(e);
        }

    }
}

module.exports = new TokenController();