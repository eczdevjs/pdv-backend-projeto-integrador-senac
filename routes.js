const express = require('express');
const routes = express.Router();

routes.get('/', (req, res)=> {
    res.send("Routes is working")
});


module.exports =  routes;