var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  name: String,
  prices: [{
    price: Number,
    date: Date
  }],
  description: String,
  source: String,
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Stock', StockSchema);