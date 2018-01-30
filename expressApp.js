const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const Fetcher = require('./bin/fetcher/fetcher');
const app = express();


//mongo
//
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern-crud', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('Mongod'))
  .catch((err) => console.error(err));

  //middleware = function((req,res,next)=>{}) express() and express().router are valid middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(Fetcher);
app.use(router);
app.use(express.static(path.join(__dirname, 'build')));
app.use('*',express.static(path.join(__dirname, 'build')));



module.exports = app;