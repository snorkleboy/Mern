const express = require('express');
const APIController = express.Router([{ mergeParams: true }]);
const catcher = require('./util/catcher');
const stockController = require('./stockController');

APIController.use(function timeLog(req, res, next) {
    console.log('in API Controller /api');
    next();
});

APIController.use('/stocks', stockController);

APIController.get('/', function (req, res, next) {
    res.send('express api');
});
// 404 and error catcher
APIController.use(catcher);



module.exports = APIController;

