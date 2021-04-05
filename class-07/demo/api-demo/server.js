'use strict';

//DOTENV (read our enviroment variable)
require('dotenv').config();

// Application Dependencies
const express = require('express');
//CORS = Cross Origin Resource Sharing
const cors = require('cors');
// client-side HTTP request library
const superagent = require('superagent');

// Application Setup
const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors());


// Routes
app.get('/', homeRouteHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('*', notFoundHandler);



// Routes Handlers
function homeRouteHandler(request, response) {
    response.status(200).send('you did a great job');
}

//http://localhost:3000/location?city=amman
function locationHandler(req, res) {
    // get data from api server (locationIQ)
    // send a request using superagent library (request url + key)
    console.log(req.query);
    let cityName = req.query.city;
    console.log(cityName)
    let key = process.env.LOCATION_KEY;
    let LocURL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;

    console.log('before superagent');
    superagent.get(LocURL) //send request to LocationIQ API
        .then(geoData => {
            console.log('inside superagent');
            console.log(geoData.body);
            let gData = geoData.body;
            const locationData = new Location(cityName, gData);
            res.send(locationData);
            // return locationData;
        })
        // .then((locationData) => {
        //     res.send(locationData);
        // })
        .catch(error => {
            console.log('inside superagent');
            console.log('Error in getting data from LocationIQ server')
            console.error(error);
            res.send(error);
        })
    console.log('after superagent');

}


function weatherHandler(req, res) {
    const geoData = require('./data/weatherbit.json');
    console.log(geoData);
    var weatherDaily = [];
    geoData.data.forEach(val => {
        var weatherData = new Weather(val);
        weatherDaily.push(weatherData);
    });
    res.send(weatherDaily);
}

function notFoundHandler(req, res) {
    res.status(404).send('Not Found');
}


//Constructors
function Location(cityName, geoData) {
    this.search_query = cityName;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

function Weather(day) {
    this.forecast = day.weather.description;
    this.time = new Date(day.datetime).toString().slice(0, 15);
}


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
