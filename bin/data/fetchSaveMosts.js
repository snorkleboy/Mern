
const Mosts = require('../../express/models/mosts/mosts');
const IEXAPI = require ('../../express/routes/util/IEXAPI');
const FileStream = require('fs');
    
const Log = function(log){
    // console.log(log);
    const fd = FileStream.appendFile(__dirname +'/logs/FetchLogs.txt', JSON.stringify(log), function (err) {
        if (err) {
            console.log('err!', err, Date.now);
            throw err;
        }
    });
}

const FetchSaveMosts = () => {

    console.log("fetching")
    IEXAPI.fetchGainers()
        .then((data) => {      
            Mosts.Gainer.remove({},()=>{
                data.forEach((gainer,i) => {
                    Mosts.Gainer.create(gainer, (err, saved) => {
                        // console.log('err', err);
                        Log({ 'date': Date.now(), 'log': (err || `saved gainers${i}`)})
                    });
                });

            });
        });
    
    IEXAPI.fetchLosers()
        .then((data) => {
            Mosts.Loser.remove({}, () => {
                data.forEach((loser,i) => {
                    Mosts.Loser.create(loser, (err, saved) => {
                        // console.log('saved', saved);
                        // console.log('err', err);
                        Log({ 'date': Date.now(), 'log': (err || `saved losers ${i}`), });
                    });
                });
            });
        });
    
    IEXAPI.fetchIEXVolume()
        .then((data) => {
            Mosts.MostVolume.remove({},()=>{
                data.forEach((volume,i) => {
                    Mosts.MostVolume.create(volume, (err, saved) => {
                        // console.log('saved', saved);
                        // console.log('err', err);
                        Log({ 'date': Date.now(), 'log': (err || `saved mostVolume ${i}`), });
                    });
                });
            });
            
        });
    IEXAPI.fetchMostActive()
        .then((data) => {
            Mosts.MostActive.remove({},()=>{
                data.forEach((active,i) => {
                    Mosts.MostActive.create(active, (err, saved) => {
                        // console.log('saved', saved);
                        // console.log('err', err);
                        Log({ 'date': Date.now(), 'log': (err ||`saved mostactive ${i}`), });
                    });
                });
            });
            
        });
    console.log("fetchs distpached");
};




module.exports = FetchSaveMosts;
