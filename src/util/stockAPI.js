// data -
//databased
//gainers w and d  //asc by d&w gain
//losers w and d    // des by d&w gain 
//most active w and d //volume asc d&w
//most spiked //volume change asc d&?w
//indicators/indexs w and d 

//basic list *searchable ?w and d?  download

// need background and scheduled tasks to download WIKI / PRICES.json ? qopts.export every day
// need background and scheduled tasks to download iex stuff every night;

//3rd part
//indepth
//financials    
//earnings
//news
//chart


//all tickers for 2018-01-25 250kb;
// only filterable by date and ticker
//https://www.quandl.com/data/WIKI-Wiki-EOD-Stock-Prices/documentation/database-overview
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?qopts.export=true&date=20180125&api_key=77ku-us9zDe-maSwnkXx




//chart 2y for zagg
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=zagg&date.gt=20160125&api_key=77ku-us9zDe-maSwnkXx
//chart 2y for zagg
// https://api.iextrading.com/1.0/stock/zagg/chart/2y

///key stats
// https://api.iextrading.com/1.0/stock/aapl/stats
//news
//stock/aapl/news/last/1

//financials
//stock/aapl/financials

//mosts
// /stock/market/list/mostactive
// /stock/market/list/gainers
// /stock/market/list/losers
// /stock/market/list/iexvolume
// /stock/market/list/iexpercent



//temp for comaptability

import IEXAPI from './IEXAPI';


export const FetchStocks = () => fetch('https://www.quandl.com/api/v3/datasets/EOD/AAPL.json?api_key=77ku-us9zDe-maSwnkXx', {
    method: "GET"
}).then((res) => res.json())


export const FetchMosts = () => fetch("/api/stocks/most/all", {
    method: "GET"
}).then((res) => {
    return res.json()
})

export const FetchMostGainer = () => fetch('/api/stocks/most/gainer', {
    method: "GET"
}).then((data) => data.json())

export const FetchMostLoser = () => fetch('/api/stocks/most/loser', {
    method: "GET"
}).then((data) => data.json())

export const FetchMostVolume = () => fetch('/api/stocks/most/volume', {
    method: "GET"
}).then((data) => data.json())

export const FetchMostActive = () => fetch('/api/stocks/most/active', {
    method: "GET"
}).then((data) => data.json())