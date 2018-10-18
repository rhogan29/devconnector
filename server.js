const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//set app 
const app = express();

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//require mongoURI from keys file
const db = require('./config/keys').mongoURI;

//connect to mongoDB through mongoose
mongoose
//connect pass in db var  
.connect(db)
//success?
.then(() => console.log('Connected to database!'))
//fail?
.catch(err => console.log(err));

// create test route
app.get('/', (req, res) => res.send('Hello From Dev Connector!'));

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// set port on env var or 5000
const port = process.env.PORT || 5000;

//listen on port 
app.listen(port, () => console.log(`Server running on port ${port}`));

