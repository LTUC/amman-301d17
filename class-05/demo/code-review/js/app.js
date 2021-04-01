'use strict';
$(()=>{
  renderPage(1);
})


$('button').click(function () {
  animalArray = [];
  let butttonID = $(this).attr('id');
  renderPage(butttonID); //renderPage(2)
});

//page 1 function//
function renderPage(id) {
  $('main').empty();
  $.ajax(`./data/page-${id}.json`)
  .then(myData => {
    myData.forEach(element => {
      let newAnimal = new Animal(element);
      newAnimal.render();
    });
    selectList();
    console.log(`animalArrayyyyyyyy page${id}`,animalArray);
    });
}

let animalArray = []; //array of objects
// constructor
function Animal(myData) {
  this.image = myData.image_url;
  this.title = myData.title;
  this.description = myData.description;
  this.keyword = myData.keyword;
  this.horns = myData.horns;
  animalArray.push(this);
}
// render objects
Animal.prototype.render = function () {
  let option = $('<option></option>').text(this.keyword);
  $('select').append(option);

  let map = {};
  $('select option').each(function () {
    if (map[this.value]) {
      $(this).remove();
    }
    map[this.value] = true;
  });

  let dataClone = $('.photo-template').html();
  let dataSet = Mustache.render(dataClone, this);
  $('main').append(dataSet);
};

function selectList() {
  let shown = {};
  let select = $('select');
  animalArray.forEach((element) => {
    if (!shown[element.keyword]) {
      let option = `<option value="${element.keyword}">${element.keyword}</option>`;
      select.append(option);
      shown[element.keyword] = true;
    }
  });
}

$('select').on('change', function () {
  let selected = $(this).val();
  $('.div').hide();
  $(`.${selected}`).show();
});

$('#sort').on('change',function(){
  let sortValue = $(this).val();
  // let sortValue = $(this).attr('id');
  console.log(sortValue);
  if(sortValue == 'Title') {
    //sort the objects by title
    sortAlgorithm('title');

  } else if (sortValue == 'Horns'){
    // sort the objects by horns
    sortAlgorithm('horns');
  }
})

function sortAlgorithm (property) {
  animalArray.sort(function (a,b){
    console.log('ssssssssssssssssss',a[property]);
    if(a[property] < b[property]) return -1;
    else if(a[property] > b[property]) return 1;
    else return 0;
  })

  animalArray.forEach(element => {
    element.render();
  });
}

