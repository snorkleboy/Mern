const express = require('express');
const userController = express.Router();
const Users = require('../models/users/user')

// clientSide Post
// params = JSON.stringify({ "username": "timk", "password": "password" })
// options = {
//     method: 'POST',
//     body: params,
//     credentials: 'same-origin',
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
        .then((passwordedUser) => passwordedUser.save())
        .then((savedUser) => savedUser.login(req.session.token))
        .then((loggedInUser) => res.json({ "id": loggedInUser._id}))
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
        .then((matchedUser) => matchedUser.login(req.session.token), (notmatched) => {res.json(notmatched)})
        .then((user) => {res.json({"ok":true})})
        .catch((err)=> res.json(err))
});


// logout
userController.delete('/:username/session', (req, res, next) => {
    req.session.token = null;
    Users.findOne({ "username": req.params["username"] }, (err, user) => {
        user.token = null
        user.save().then(()=>res.json({"ok":true}))
    });
    // login
    // post request with password will authenticate password and respond with session token

});

module.exports = userController;



