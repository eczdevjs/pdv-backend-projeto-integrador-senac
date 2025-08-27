
const routes =require('./routes');
const express = require('express');
const app = express();
const port = 3000;
require("./src/database/connection");


app.use(routes);

// app.get('/', (req, res)=>{
//     res.send("Server running");
// })

app.listen(port, ()=>{
    console.log("Listening port 3000\nPress CTRL + click => http://localhost:3000")
});