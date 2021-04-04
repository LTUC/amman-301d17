// npm start >>> node server.js >> nodemon (sudo npm i -g nodemon)
'use strict';

const express = require('express'); // npm i express
require('dotenv').config(); // npm i dotenv
// CORS: Cross Origin Resource Sharing -> for giving the permission for who(clients) can touch my server oe send requests to my server
const cors = require('cors'); // npm i cors

const server = express();

const PORT = process.env.PORT || 5000;
//PORT = .env
//PORT = 5000
//PORT = Heroku PORT

// make my server open to any client
server.use(cors());

// console.log(process);

//Routes

// request url (browser): localhost:3030/
// req: carries all the parameters in the header
server.get('/',(req,res)=>{
    res.send('you server is working')
})

// request url (browser): localhost:3030/location
server.get('/location',(req,res)=>{
    // res.send('location route')
    // fetch the data from geo.json file
    let geoData = require('./data/geo.json');
    // console.log(geoData);
    let locationData = new Location (geoData);
    // console.log(locationData);
    res.send(locationData);
})

function Location(locData) {

    // {
    //     "search_query": "seattle",
    //     "formatted_query": "Seattle, WA, USA",
    //     "latitude": "47.606210",
    //     "longitude": "-122.332071"
    //   }
    // console.log(locData);
    this.search_query = 'Lynwood';
    this.formatted_query =  locData[0].display_name;
    this.latitude = locData[0].lat;
    this.longitude = locData[0].lon;
    // this.cityName = locData[0].display_name;
}

//any route
//location:3030/ddddddd
server.get('*',(req,res)=>{
    // res.status(404).send('wrong route')
    // {
    //     status: 500,
    //     responseText: "Sorry, something went wrong",
    //     ...
    //   }
    let errObj = {
        status: 500,
        responseText: "Sorry, something went wrong"
    }
    res.status(500).send(errObj);
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})