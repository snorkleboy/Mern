const express = require('express');
const userController = express.Router();
// const User = require('../models/user/user')



//nested under HOST/api/users
userController.use(function timeLog(req, res, next) {
    console.log('in User controller /api/User');
    next();
});

// create user
userController.post('/', (req, res, next) => {
    // Mosts.Gainer.find({}, (error, data) => {
    //     res.json(data);
    // }).select('-_id -created_at -__v');


    // post request with uername and password makes new account and responds with sucess message && session token

});

// check if username is registered
userController.get('/:username', (req, res, next) => {

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



