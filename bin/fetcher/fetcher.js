

const FetchSaveMosts = require ('../data/fetchSaveMosts');

let timer = undefined;
const startTimer = ()=> {
        console.log("STARTING TIMEOUT")
    setTimeout(()=>{
        console.log("STARTING INTERVAL FETCH");
        timer = setTimeout(()=>{
        FetchSaveMosts();
    },1000);
    // console.log("FETCH TIMER ID =",timer);
    },3000);
};
if (!timer) startTimer();
const Fetcher = function(req,res,next){
    console.log('inside FETCHER')
    
    next();
};

module.exports = Fetcher;