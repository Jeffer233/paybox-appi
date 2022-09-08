const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'payboxdb'
    }
});  

const app = express();

app.use(bodyParser.json());
app.use(cors()) 

app.get('/', (req, res) => {
    res.send('succeed');
})

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    db('users')
     .returning('*')
     .insert({
       email: email,
       password: password 
    })
    .then(user => {
        res.json(user[0]);  
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is sweet on port ${process.env.PORT}');
})