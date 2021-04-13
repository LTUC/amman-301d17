'use strict'

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: true }));
// Specify a directory for static resources
app.use(express.static('./public'));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// Set the view engine for server-side templating
app.set('view engine', 'ejs');


// API Routes
app.get('/', getTasks);
app.get('/showForm',showFormHandler);
app.post('/addTask',addTaskHandler);
app.get('/taskDetails/:taskID',getOneTaskDetails); //taskID=3 //taskDetails/3


// HELPER FUNCTIONS
function getTasks(request, response) {
  let SQL = `SELECT * FROM tasks;`;
  client.query(SQL)
  .then (results=>{
    response.render('index',{taskResults:results.rows})
  })
  .catch(err=>{
    res.render('error',{error:err})
  })
}

function showFormHandler(req,res) {
  res.render('taskForm');
}

// Request URL: http://localhost:3000/addTask
function addTaskHandler(req,res) {
  console.log(req.body);
  let {title,description,contact,status,category} = req.body;
  let SQL = `INSERT INTO tasks (title,description,contact,status,category) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  // let safeValues = [req.body.title,req.body.description,req.body.contact,req.body.status,req.body.category];
  let safeValues = [title,description,contact,status,category];
  client.query(SQL,safeValues)
  .then(result=>{
    console.log(result.rows)
    // res.render('index');
    // res.redirect('/'); //localhost:3000/
    // getTasks()
    res.redirect(`/taskDetails/${result.rows[0].id}`)
  })
}

// http://localhost:3000/taskDetails/3
function getOneTaskDetails(req,res) {
  // get from DB task id =3
  console.log(req.params);
  let SQL = `SELECT * FROM tasks WHERE id=$1;`;
  let safeValue = [req.params.taskID]
  client.query(SQL,safeValue)
  .then(result=>{
    console.log(result.rows);
    res.render('oneTask',{task:result.rows[0]})
  })
}


app.get('*', (req, res) => {
  // res.status(404).send('This route does not exist')
  res.render('404page');
});


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })



