
const routes =require('./routes');
const express = require('express');
const app = express();
const port = 3000;
require("./src/database/connection");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(port, ()=>{
    console.log("Listening port 3000\nPress CTRL + click => http://localhost:3000")
});