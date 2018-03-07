const express = require('express');
const APIController = express.Router([{ mergeParams: true }]);
const catcher = require('./util/catcher');
const stockController = require('./stockController');
const userController = require('./userController');
// nested under HOST/api
APIController.use(function timeLog(req, res, next) {
    console.log('in API Controller /api');
    next();
});

APIController.use('/stocks', stockController);
APIController.use('/user', userController);
APIController.get('/', function (req, res, next) {
    res.send('express api, /stocks for stock controller /user for user controller');
});
// 404 and error catcher
APIController.use(catcher);



module.exports = APIController;


