const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const FetchSaveMosts = require('../bin/data/fetchSaveMosts');
const router = require('./routes/router');
const session = require('express-session')


//mongo
//
const uristring = process.env.MONGOLAB_URI || process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mern-crud';
mongoose.connect(uristring, { promiseLibrary: require('bluebird') }, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
        FetchSaveMosts();
      }
    });



//////middleware

// read and encrypt session cookies
app.set('trust proxy', 1) // trust first proxy
var sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))


app.use(logger('dev'));
// gets parameters out of body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
// router- all api nested under router
app.use(router);
// file server
app.use(express.static(path.join(__dirname, '../build')));
app.use('*',express.static(path.join(__dirname, '../build')));



module.exports = app;