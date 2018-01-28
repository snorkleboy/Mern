const express = require('express');
const stockController = express.Router();
const Stock = require('../models/stock');

stockController.use(function timeLog (req, res, next) {
  console.log('in stock controller /api/stocks');
  next();
});

stockController.get('/time', function (req, res, next) {
  res.json({date: Date.now()});
});
stockController.get('/:id', (req, res, next)=> {
  res.send(req.params.id);
});

// get all
stockController.get('/', function(req, res, next) {
  Stock.find(function (err, stocks) {
    if (err) return next(err);
    res.json(stocks);
  });
});

// post
stockController.post('/', function (req, res, next) {
  Stock.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});




curl -i -X POST -H "Content-Type: application/json" -d '{name:"stock"}' localhost: 3000 / api / stocks
module.exports = stockController;