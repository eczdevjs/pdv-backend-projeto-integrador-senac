
const routes =require('./routes');
const express = require('express');
const app = express();
const port = 3001;
require("./src/database/connection");
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

// preventing app crashing due to missing body for routes that expect one [test: working] 
// REPLACED BY MIDDLEWARE FOR ONLY ROUTES BODY IS REQUIRED
// app.use((err, req, res, next)=>{
//     if(err instanceof SyntaxError && 'body' in err){
//         return res.status(400).json({msg: 'Invalid or epty JSON body'});
//     }
//     next();
// });


app.listen(port, ()=>{
    console.log("Listening port 3000\nPress CTRL + click => http://localhost:3001")
});