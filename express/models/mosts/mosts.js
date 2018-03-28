const mongoose = require('mongoose');

const Most = new mongoose.Schema({
    symbol: {
        type: String,
        required: 'must include symbol name'
    },
    latestUpdate:Date,
    open: Number,
    close: Number,
    "last close": { type: Number, alias: "previousClose"},
    "price": { type: Number, alias: 'latestPrice'},
    high: Number,
    low: Number,
    change: Number,
    "Change%": { type: Number, alias: "changePercent"},
    marketCap: Number,
    peRatio: Number,
    ytdChange: Number,
    nonarealthing: Number,
    avgTotalVolume: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
});
const Gainer = mongoose.model('gainers', Most);
const Loser = mongoose.model('losers', Most);
const MostVolume = mongoose.model('mostVolume', Most);
const MostActive = mongoose.model('mostActive', Most);
module.exports = {
    Gainer,
    Loser,
    MostVolume,
    MostActive
};



// const headerChange = { "latestPrice": "price", 'changePercent': "Change%", "previousClose": "last close" }
