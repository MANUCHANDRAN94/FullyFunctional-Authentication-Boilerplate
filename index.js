//this is the starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //this is for loggging incoming request and we use it for debugging
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

//Database setup
mongoose.connect('mongodb://localhost:auth/auth' , { useUnifiedTopology: true , useNewUrlParser: true , useCreateIndex: true});

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'})); //any request incoming will be parsed with json
routes(app);

//server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port 3000');

