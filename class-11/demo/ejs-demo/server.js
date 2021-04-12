'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

// Application Setups
const PORT = process.env.PORT || 3030;
const server = express();
server.set('view engine','ejs');
server.use(express.static('./public'))

//localhost:3000/
server.get('/',(req,res)=>{
    // res.send('home route');
    res.render('index');
})

// http://localhost:3000/listFamily
server.get('/listFamily',(req,res)=>{
    let familyArr = ['Atallah','Mesina','Ali','Razan'];
    res.render('listFamilyMembers',{familyData:familyArr});
})

// http://localhost:3000/booksList
server.get('/booksList',(req,res)=>{
    let url = `https://www.googleapis.com/books/v1/volumes?q=cats`;
    superagent.get(url)
    .then(booksData=>{
        // res.send(booksData.body);
        res.render('booksList',{booksArr:booksData.body.items})
    })

})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})