// app.js
const express = require('express');
const app = express();
require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');


// setting session options (code used from online slides)
const sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};
app.use(session(sessionOptions));


// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// static files setup
app.use(express.static(publicPath));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));



// getting the routes
const welcome = require('./routes/welcome');



// route middleware goes here.
app.use('/', welcome);


// firing up the node server
app.listen(process.env.PORT || 3000);