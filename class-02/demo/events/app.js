'use strict';

// $('button').click(function(){
//     console.log('you clicked me!!')
// })

// $('button').on('click',function(){
//     console.log('stop clicking me!!');
//     $('ul').toggleClass('on');
// })


// $('ul').click(function(){
//     console.log('ul!!!!');
//     console.log(this);
//     // console.log(this.text());
//     // console.log($(this));
//     // console.log($(this).text());
// })

// $('select').on('change',function(){
//     console.log(`it's changed`);
//     console.log($(this));
//     console.log($(this).val());
//     console.log($(this).text());
// })


$.ajax('./people.json')
    .then(peopleData => {
        console.log(peopleData);
        peopleData.forEach(val => {
            // console.log(val);
            let newPerson = new Person(val);
            newPerson.renderName();
        })
        $('.person-template').first().remove();
    })


function Person(personN) {
    console.log(personN);
    this.personName = personN.name;
}

Person.prototype.renderName = function () {
    // $('ul').append(`
    // <li>${this.personName}</li>
    // `);
    
    
    // <li class="person-template">
    //     <span class="ppl">Razan</span>
    //   </li>
    
    // let personClone = $('.person-template').eq(0).clone();
    let personClone = $('.person-template').first().clone();
    // let personClone = $('.person-template').clone();
    // personClone.removeClass('person-template');
    console.log('personClone',personClone);

    personClone.find('span').text(this.personName);

    $('ul').append(personClone);

}



