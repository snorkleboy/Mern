const express = require('express');
const userController = express.Router();
const Users = require('../models/users/user')

// clientSide Post
// params = JSON.stringify({ "username": "timk", "password": "password" })
// options = {
//     method: 'POST',
//     body: params,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// }
// fetch("/api/users", options).then(res => res.json()).then(data => console.log(data))


//nested under HOST/api/users
userController.use(function timeLog(req, res, next) {
    console.log('in User controller /api/User');
    next();
});
userController.get('/', (req, res, next) => {
    Users.find({}, (err, data) => res.json(data))

});
userController.get('/delete', (req, res, next) => {
    Users.remove({}, (err, data) => res.json(data))

});
// create user
userController.post('/', (req, res, next) => {
    newUser = new Users({ 'username': req.body.username});
    newUser.createPasswordDigest(req.body.password)
        .then(passwordedUser => passwordedUser.save())
        .then((savedUser) =>  res.json({"id":savedUser._id}))
        .catch((err) => res.json(err))
});

// check if username is registered
userController.get('/:username', (req, res, next) => {
    Users.findOne({ "username": req.params["username"]}, (err,user)=>{
        res.json({ "isUser": user ? true : false})
    });
    
});

// login
userController.post('/:username/session', (req, res, next) => {
    Users.authenticate(req.params.username, req.body.password)
        .then((user)=> res.json({"token":"none"}), (notmatched)=>res.json(notmatched))
    // login
    // post request with password will authenticate password and respond with session token

});

// logout
userController.delete('/:username/session', (req, res, next) => {
    // login
    // post request with password will authenticate password and respond with session token

});

module.exports = userController;



