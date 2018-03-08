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
userController.get('/delete', (req, res, next) => {
    User.remove({}, (err, data) => res.json(data))

});
// create user
userController.post('/', (req, res, next) => {
    newUser = new User({ 'username': req.body.username});
    newUser.createPasswordDigest(req.body.password)
        .then(passwordedUser => passwordedUser.save())
        .then((savedUser) => { res.json(err ? err : savedUser)})
        .catch((err) => res.json(err))
});

// check if username is registered
userController.get('/:username', (req, res, next) => {
    User.findOne({ "username": req.params["username"]}, (err,user)=>{
        console.log(err, user, req.params["username"] )
        res.json({ "isUser": user ? true : false})
    });
    
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



