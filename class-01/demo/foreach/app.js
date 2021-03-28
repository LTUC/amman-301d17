// Array.forEach is a method on an array that processes every element in the array with a callback
// The callback is always given the current element's value and index in the array as args
// forEach runs a CALLBACK function WITH every element of the array


let people = ['Razan','Sherry','Abdulrahman','Aisha'];
// for (let i=0;i<people.length;i++) {
//   console.log(people[i]);
// }

// people.forEach(function(item,i){
//   console.log(item);
//   console.log(i);
//   // console.log(item[i]);
//   // console.log(people[i]);
// })

// people.forEach((item,index)=>{
//   console.log(item);
//   console.log(index);
// })

// let displayName = (item,index) => console.log(item);

// function displayName(item,index) {
//   console.log(item);
//   // console.log(item[index]);
//   console.log(people[index]);
// }

// people.forEach(displayName);


// person.userName = 'Razan'
// person['userName'] = 'Razan'



const addOne = (arr) => {
  // Solution code here...
  let newArr = arr;
  newArr.forEach(val=>{
    val = val+1;
  })
  return newArr;
};

addOne([1, 2, 3, 4, 5])