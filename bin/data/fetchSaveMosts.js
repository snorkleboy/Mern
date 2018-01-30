const Mosts = require('../../models/mosts/mosts');
const IEXAPI = require ('../../src/util/IEXAPI');

const fetch = ()=>{

    IEXAPI.fetchGainers().then((data) => {
        console.log(data);
        data.forEach((gainer) => {
            Mosts.Gainer.create(gainer, (err, saved) => {
                console.log(saved);
                console.log(err);

            });
        });
    });


}

module.exports = fetch;
