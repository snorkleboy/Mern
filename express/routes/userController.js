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
    const user = { 'username': "usernamee", 'password': "passwordd" }
    User.create(user,(error, newUser)=>{
        if (error){
            res.json(error)
        }
        else{
            res.json(newUser)
        }
    })

    // Users.find({}, (err, data) => res.json(data))
    console.log('user controller get 2')

});
// create user
userController.post('/', (req, res, next) => {
    // Mosts.Gainer.find({}, (error, data) => {
    //     res.json(data);
    // }).select('-_id -created_at -__v');
    console.log("user.ceate")
    Users.create({'username':"usernamee",'password':"passwordd"},(error,mystery) => {console.log(error,mystery);res.json({'err':error,'thing':mystery})})
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



