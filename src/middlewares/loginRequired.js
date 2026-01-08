const jwt = require('jsonwebtoken');

const loginRequired  = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({msg: "Access denied"});
    }

    const [text, token] = authorization.split(' ');

    try {
        // extracting payload from token
        const data =  jwt.verify(token, process.env.TOKEN_SECRET);
        const {id, email} = data;
        // creating two fields with data from token into req
        req.userId = id;
        req.userEmail = email;
        // calling next middleware;
        return next();

    } catch (error) {
        res.status(401).json({msg: 'Token invalid or expired'});
    }

};


module.exports = loginRequired;
