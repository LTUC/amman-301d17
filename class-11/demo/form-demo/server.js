'use strict';

require('dotenv').config();

const express = require('express');

const server = express();

server.use(express.static('./public'));

server.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3030;

// http://localhost:3000/login?userName=razan&emailAddress=sherry%40hh.com
// server.get('/login',(req,res)=>{
//     console.log('inside GET login route',req.query);
//     res.send('okay');
// })

// http://localhost:3000/login
// form data userName=razan&emailAddress=sherry%40hh.com
server.post('/login',(req,res)=>{
    console.log('inside POST login route',req.body);
    res.send('okay2');
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

