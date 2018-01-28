const express = require('express');
const stockController = express.Router();

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
stockController.get('/', function(req, res, next) {
  res.send('stocks');

});




module.exports = stockController;