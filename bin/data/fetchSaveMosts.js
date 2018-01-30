const Mosts = require('../../models/mosts/mosts');
const IEXAPI = require ('../../routes/util/IEXAPI');

const FetchSaveMosts = ()=>{
    console.log('here')
    IEXAPI.fetchGainers().then((data) => {
        console.log(data);
        data.forEach((gainer) => {
            Mosts.Gainer.create(gainer, (err, saved) => {
                console.log(saved);
                // console.log(err);

            });
        });
    });


}

module.exports = FetchSaveMosts;
