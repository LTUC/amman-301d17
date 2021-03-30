'use strict';

// let templateId = '#neighborhood-template';

let neighborhoods = [];

function Neighborhood (rawDataObject) {
  this.name = rawDataObject.name;
  this.city = rawDataObject.city;
  this.population = rawDataObject.population;
  this.founded = rawDataObject.founded;
  this.body = rawDataObject.body;
}


Neighborhood.prototype.toHtml = function() {
  // Demo Part 1: Build it all with jQuery
  // let dataSet = $('#div1').append(`<h2>${this.name}<\h2> <p>${this.city}</p>`)
  // return dataSet;

  // Demo Part 2: Use jQuery to clone
  // let dataSet = $('.template').first().clone();
  // dataSet.find('.name').text(this.name);
  // dataSet.find('.city').text(this.city);
  // dataSet.find('.population').text(this.population);
  // dataSet.find('.founded').text(this.founded);
  // dataSet.find('.body').text(this.body);
  // return dataSet;


  // Demo Part 3: Mustache
  // get the template from the HTML
  let template = $('#neighborhoodTemplate').html();
  let dataSet = Mustache.render(template,this);
  return dataSet;

//   <div>
//   <h2>{{name}}</h2>
//   <p>{{city}}</p>
//   <p>{{population}}</p>
//   <p>{{founded}}</p>
//   <p>{{body}}</p>
// </div>

// name:        'Marj Alhamam',
// city:        'Amman',
// population:  '23,566',
// founded:     '1820',
// body:        '<p>T

//   <div>
//   <h2>arj Alhamam</h2>
//   <p>Amman</p>
//   <p>23,566</p>
//   <p>1820</p>
//   <p>kkkkkkkkkkkkkkkk</p>
// </div>
  
};



neighborhoodDataSet.forEach(neighborhoodObject => {
  let newObj = new Neighborhood(neighborhoodObject);
  neighborhoods.push(newObj);
  let renderedObj = newObj.toHtml()
  $('#neighborhoods').append(renderedObj);
});

