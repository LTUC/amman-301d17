
let num1 = 7;
let num2 = num1; // passing by value
num2 =9;
console.log(num1);
console.log(num2);


let person = {
  name:'Razan'
}
// let copyPerson = person; //passing by reference
// let copyPerson = { ...person}; // spread operator
// let copyPerson = Object.assign({},person); // clonning
copyPerson.name = 'Sherry';
console.log(person);
console.log(copyPerson);



