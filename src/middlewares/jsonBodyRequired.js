const jsonBodyRequired = (req, res, next) => {
    console.log('jsonBodyREquired Called *********************************')
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ msg: 'Request body is required' });
    }
    next();
}

module.exports = jsonBodyRequired;