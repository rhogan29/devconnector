const express = require('express');
const mongoose = require('mongoose');

//set app 
const app = express();

//require mongoURI from keys file
const db = require('./config/keys').mongoURI;

//connect to mongoDB through mongoose
mongoose
.connect(db)
//success?
.then(() => console.log('Connected to database!'))
//fail?
.catch(err => console.log(err));

// create test route
app.get('/', (req, res) => res.send('Hello From Dev Connector!'));

// set port on env var or 5000
const port = process.env.PORT || 5000;

//listen on port 
app.listen(port, () => console.log(`Server running on port ${port}`));

