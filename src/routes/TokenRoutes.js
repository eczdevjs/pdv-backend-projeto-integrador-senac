const Router = require('express');
const jsonBodyRequired = require("../middlewares/jsonBodyRequired");
const tokenController = require('../controller/tokenController');


const router = new Router();

router.post(
    '/tokens',
    jsonBodyRequired,
    tokenController.store
);

module.exports = router;