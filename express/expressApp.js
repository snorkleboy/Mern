const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const FetchSaveMosts = require('../bin/fetchSaveMosts');
const FetchSaveRSS = require('../bin/fetchSaveRSS');
const router = require('./routes/router');


//mongo
//
const uristring = process.env.MONGOLAB_URI || process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mern-crud';
mongoose.connect(uristring, {
  promiseLibrary: require('bluebird')
}, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
    FetchSaveMosts();
    // FetchSaveRSS();
  }
});



//////middleware

// read and encrypt session cookies
app.set('trust proxy', 1) // trust first proxy
var sess = {
  secret: 'asofOAHij98h9UI4jq9rfmaklnfahYFAYdf9f9UIPaf8',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
}
if (app.get('env') === 'production') {
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))


app.use(logger('dev'));
// gets parameters out of body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
// router- all api nested under router
app.use(router);
// file server
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', express.static(path.join(__dirname, '../build')));



module.exports = app;