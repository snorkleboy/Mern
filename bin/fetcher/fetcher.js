const FetchSaveMosts = require ('../data/fetchSaveMosts');

let timer = undefined;
const startTimer = ()=> {
    console.log("STARTING INTERVAL FETCH");
    timer = setInterval(()=>{
        FetchSaveMosts();
    },1000*60*60);
    console.log("FETCH TIMER ID =",timer);
};

const Fetcher = function(req,res,next){

    if (!timer) startTimer();
    next();
};

module.exports = Fetcher;