const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();


//mongo
//
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern-crud', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('Mongod'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

app.use(router);
app.use(express.static(path.join(__dirname, 'build')));
app.use('*',express.static(path.join(__dirname, 'build')));



module.exports = app;