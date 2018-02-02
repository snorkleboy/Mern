

const FetchSaveMosts = require ('../data/fetchSaveMosts');

let timer = undefined;
const startTimer = ()=> {
    setTimeout(()=>{
        console.log("FETCHING AND STARTING INTERVAL FETCH");
        FetchSaveMosts();
        timer = setInterval(()=>{
           console.log("fetching INTERVAL");
           if (Date.now().getHours == 12){
               console.log('fetching')
               console.log('time is 12 hrs')
               FetchSaveMosts();
           }else{
               console.log('not fetching');
           }
        
        },1000*60*60);
    // console.log("FETCH TIMER ID =",timer);
    },7000);
};
if (!timer) startTimer();

const Fetcher = function(req,res,next){

};

module.exports = Fetcher;