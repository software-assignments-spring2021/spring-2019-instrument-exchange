// app.js
const express = require('express');
const app = express();
require('./db');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const public_path = path.resolve(__dirname, 'public');


// setting session options (code used from online slides)
const session_options = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};
app.use(session(session_options));


// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// static files setup
app.use(express.static(public_path));

app.use(cookie_parser());
app.use(body_parser.urlencoded({ extended: false }));



// getting the routes
const welcome = require('./routes/welcome');



// route middleware goes here.
app.use('/', welcome);


// firing up the node server
app.listen(process.env.PORT || 3000);