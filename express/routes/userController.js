const express = require('express');
const userController = express.Router();
const User = require('../models/users/user')
// const User = require('../models/user/user')



//nested under HOST/api/users
userController.use(function timeLog(req, res, next) {
    console.log('in User controller /api/User');
    next();
});
userController.get('/', (req, res, next) => {
    User.find({}, (err, data) => res.json(data))

});
// create user
userController.post('/', (req, res, next) => {
    console.log();
    
    User.create({ 'username': req.body.username, 'password': req.body.password }, (error, newuser) => { console.log(error, newuser); res.json({ 'err': error, 'user': newuser})})
    // post request with uername and password makes new account and responds with sucess message && session token

});

// check if username is registered
userController.get('/:username', (req, res, next) => {
    res.json({"input":req.params["username"]})
});

// login
userController.post('/:username/session', (req, res, next) => {
    // login
    // post request with password will authenticate password and respond with session token

});

// logout
userController.delete('/:username/session', (req, res, next) => {
    // login
    // post request with password will authenticate password and respond with session token

});

module.exports = userController;



