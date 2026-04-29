const User = require('../model/UserModel');


class PhotoController {
    async store(req, res, next) {
        try {




            return res.status(201).json(req.file)
        } catch (e) {
            res.json(e);
        }

    }
}

module.exports = new PhotoController();