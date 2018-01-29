
//IEX ENDPOINTS
//IEXPREFIX https://api.iextrading.com/1.0

///key stats
// https://api.iextrading.com/1.0/stock/aapl/stats

//news
//stock/aapl/news/last/1

//financials
//stock/aapl/financials

//chart 2y for zagg
// https://api.iextrading.com/1.0/stock/zagg/chart/2y

//mosts
// /stock/market/list/mostactive
// /stock/market/list/gainers
// /stock/market/list/losers
// /stock/market/list/iexvolume
// /stock/market/list/iexpercent

import * as StockActions from '../components/stocks/stockActions';
const IEXAPI = ()=>{};
// IEXAPI.prototype = Object.create;

const IEX_URL = 'https://api.iextrading.com/1.0/';
IEXAPI.prototype.fetchChart = (ticker,time) => fetch(IEX_URL + `/stock/${ticker}/chart/${time}`, {
    method: 'GET'
}).then((res) => res.json());

IEXAPI.prototype.fetchFinancials = (ticker) => fetch(IEX_URL + `/stock/${ticker}/financials`,{
        method: 'GET'
    }).then((res) => res.json());

IEXAPI.prototype.fetchNews = (ticker,last) => fetch(IEX_URL + `stock/${ticker}/news`+ last ? `/last/${last.val}` : '',{
        method: 'GET'
    }).then((res) => res.json());

IEXAPI.prototypefFetchDetails = (ticker) => fetch(IEX_URL + `stock/${ticker}/stats`,{
        method: 'GET'
    })
    .then((res) => res.json());


    //retuns fetch function thunk in a thunk that calls receiveStocks, would be called like thunker(fetchGainers)() or thunker(fetchGainers, ReceiveStocks)
IEXAPI.prototype.thunker = (fetchFunc, action = StockActions.receiveStocksFromIEX) => () => dispatch => fetchFunc().then((success) => dispatch(action(success)),
    (fail) => console.log(fail));

IEXAPI.prototype.fetchMostActive = () => fetch(IEX_URL+'stock/market/list/mostactive',{
        method: 'GET'
    })
    .then((res) => res.json());

IEXAPI.prototype.fetchGainers = () => fetch(IEX_URL + 'stock/market/list/gainers',{
        method: 'GET'
    })
    .then((res) => res.json());
IEXAPI.prototype.fetchLosers = () => fetch(IEX_URL + 'stock/market/list/losers',{
        method: 'GET'
    })
    .then((res) => res.json());

IEXAPI.prototype.fetchIEXVolume = () => fetch(IEX_URL + 'stock/market/list/iexvolume',{
        method: 'GET'
    })
    .then((res) => res.json());

IEXAPI.prototype.fetchIEXPercent = () => fetch(IEX_URL + 'stock/market/list/iexpercent',{
        method: 'GET'
    })
    .then((res) => res.json());



export default new IEXAPI();
if (process.env.NODE_ENV !== 'production') {
    // must use 'require' (import only allowed at top of file)
    window.IEXAPI = new IEXAPI();
}
