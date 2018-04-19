const mongoose = require('mongoose');

const RSSNews = new mongoose.Schema({
    source: {
        type: String,
        required: 'must have source'
    },
    sourceTimeStamp:Date,

    "last close": { type: Number, alias: "previousClose"},
    "price": { type: Number, alias: 'latestPrice'},

    "Change%": { type: Number, alias: "changePercent"},
    title:string,
    pudDate:Date,
    thumbnail:string,
    backupImg:string,
    link:string,
    author:string,
    description:string,
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
