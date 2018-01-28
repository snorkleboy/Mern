var express = require('express');
var stockController = express.Router();

stockController.use(function timeLog (req, res, next) {
  console.log('in stock controller');
  next();
});

stockController.get('/time', function (req, res, next) {
  console.log('here');
  res.json({date: Date.now()});
});
stockController.get('/:id', (req, res, next)=> {
  res.send(req.params.id)
});
stockController.get('/', function(req, res, next) {
  res.send('Express REST API');
});

module.exports = stockController;