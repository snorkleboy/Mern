const express = require('express');
const stockController = express.Router();
const Stock = require('../models/stock');
const Mosts = require('../models/mosts/mosts');


//nested under HOST/api/stocks
stockController.use(function timeLog (req, res, next) {
  console.log('in stock controller /api/stocks');
  next();
});

stockController.get('/most/volume', (req, res, next) => {
  Mosts.MostVolume.find((error,data)=>{
    res.json(data);
  });
  
});
stockController.get('/most/gainer', (req, res, next) => {
  Mosts.Gainer.find({},(error,data) => {
    res.json(data);
  });

});
stockController.get('/most/loser', (req, res, next) => {
  Mosts.Loser.find({}, (error,data) => {
    res.json(data);
  });
});
stockController.get('/most/active', (req, res, next) => {
  Mosts.MostActive.find({}, (error,data) => {
    res.json(data);
  });
});
stockController.get('/most/all', (req, res, next) => {
  const response = {gainers:[],losers:[],mostActive:[],MostVolume:[]};
  const promises = [];
  promises.push(Mosts.MostActive.find({}, (error,data) => { response.mostActive=data; }));
  promises.push(Mosts.Loser.find({}, (error,data) => { response.losers = data;}));
  promises.push(Mosts.MostVolume.find({}, (error,data) => { response.MostVolume = data;}));
  promises.push(Mosts.Gainer.find({}, (error,data) => { response.gainers = data;}));
  Promise.all(promises).then(()=>{
    res.json(response);
  })
  
});


stockController.get('/time', function (req, res, next) {
  res.json({date: Date.now()});
});
stockController.get('/:id', (req, res, next)=> {
  res.send(req.params.id);
});
stockController.get('/', function(req, res, next) {
  Stock.find(function (err, stocks) {
    if (err) return next(err);
    res.json(stocks);
  });
});
stockController.post('/', function (req, res, next) {
  Stock.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });


});

module.exports = stockController;