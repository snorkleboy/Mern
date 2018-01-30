const mongoose = require('mongoose');

const Most = new mongoose.Schema({
    symbol: {type: String,required: 'must include symbol name' },
    open: Number,
    close:Number,
    previousClose:Number,
    changePercen:Number,
    marketCap:Number,
    peRatio:Number,
    ytdChange:Number,
    created_at: { type: Date, default: Date.now },
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