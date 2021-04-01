'use strict';

// make a variable called express to use the express library
const express = require('express'); //npm install express

// server has all the Express properities and methods
const server = express();
const PORT = process.env.PORT || 3030;

// to access an file in public directory
server.use(express.static('./public'));


// Route Definitions
//localhost:3030/
server.get('/',(req,res)=>{
    res.send('home route')
})

// localhost:3030/test ->http request (/test->route)
server.get('/test',(request,response)=>{
    response.send('You server is alive!!')
})

//localhost:3030/location?city=amman 
// request (localhost:3030/location)
// route(/location)
// city=amman (request query parameters)


// localhost:3030/data ->http request (/data->route)
server.get('/data',(req,res)=>{
    let family = [
        {nName:'Razan'},
        {nName:'Sherry'}
    ]
    // res.send(family);
    res.json(family);
})


// the server is ready for listening 
server.listen (PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})

// to run the server (npm start || node server.js)
// to stop the server (ctrl+c)
