import * as StockActions from '../components/stocks/stockActions';
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


const filterMods = [
    'symbol',
    'open',
    'close',
    'previousClose',
    'changePercent',
    'marketCap',
    'peRatio',
    'ytdChange'

];
const mods = [
    "displayPercent=true",

];
const IEX_URL = 'https://api.iextrading.com/1.0/';

const IEXAPI = class{
    constructor(modifers = mods, filters = filterMods) {

        this.mods = modifers || [];
        this.filters = filters || [];
        this.attrWriter = this.attrWriter.bind(this);
        this.fetchGainers = this.fetchGainers.bind(this);
        this.fetchLosers = this.fetchLosers.bind(this);
        this.addMods = this.addMods.bind(this);
        this.setMods = this.setMods.bind(this);
        this.addFilters = this.addFilters.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.fetchChart = this.fetchChart.bind(this);
        this.fetchFinancials = this.fetchFinancials.bind(this);
        this.fetchNews = this.fetchNews.bind(this);
        this.fetchDetails = this.fetchDetails.bind(this);
        this.fetchMostActive = this.fetchMostActive.bind(this);
        this.fetchIEXVolume = this.fetchIEXVolume.bind(this);
        this.fetchIEXPercent = this.fetchIEXPercent.bind(this);
        console.log('IEXAPI CONSUTRCTION', this);
    }

    
    addMods(modif){ modif.forEach((modi) => this.mods.push(modi)); return this; }
    setMods(modif){ this.filters = modif; return this; }
    addFilters(filters){ filters.forEach((filter) => this.filters.push(filter)); return this; }
    setFilters(filters){ this.filters = filters; return this; }

    attrWriter(){
    const filtersString = this.filters.length > 0 ? `filter=${this.filters.join(',')}` : '';
    const modsString = this.mods.length > 0 ? this.mods.join('&') : '';
    const query = (filtersString !== '' || modsString !== '');

    let string = '';
    if (query) {
        string = string + '?';
        if (filtersString) {
            string = string + filtersString;
            string + modsString ? '&' + modsString : '';
        } else {
            string = string + modsString;
        }
    }
    // console.log("STRING =", string, IEX_URL+string )
    return (string);
    }
    //retuns fetch function thunk in a thunk that calls receiveStocks, would be called like thunker(fetchGainers)() or thunker(fetchGainers, ReceiveStocks)()
    thunker(fetchFunc, action = StockActions.receiveStocksFromIEX){
        return () => dispatch => fetchFunc().then((success) => dispatch(action(success)),
        (fail) => console.log(fail));
    }
    fetchChart(ticker,time){
        return fetch(IEX_URL + `/stock/${ticker}/chart/${time}` + this.attrWriter(), {
            method: 'GET'
        }).then((res) => res.json());}


    fetchFinancials(ticker){
        return fetch(IEX_URL + `/stock/${ticker}/financials` + this.attrWriter(),{
            method: 'GET'
        }).then((res) => res.json());
    }

    fetchNews(ticker,last){
        return fetch(IEX_URL + `stock/${ticker}/news` + this.attrWriter()+ last ? `/last/${last.val}` : '',{
            method: 'GET'
        }).then((res) => res.json());
    }

    fetchDetails(ticker){
        return fetch(IEX_URL + `stock/${ticker}/stats` + this.attrWriter(),{
            method: 'GET'
        }).then((res) => res.json());
    }

    
    fetchGainers() {
        return (fetch(IEX_URL + 'stock/market/list/gainers' + this.attrWriter(), {
            method: 'GET'
        }).then((res) => res.json()));

    }

    fetchMostActive(){
        return fetch(IEX_URL + 'stock/market/list/mostactive' + this.attrWriter(),{
        method: 'GET'
    })
    .then((res) => res.json());
    }

    fetchLosers(){
        return fetch(IEX_URL + 'stock/market/list/losers' + this.attrWriter(),{
        method: 'GET'
    })
    .then((res) => res.json());
    }
    fetchIEXVolume(){
        return fetch(IEX_URL + 'stock/market/list/iexvolume' + this.attrWriter(),{
        method: 'GET'
    })
    .then((res) => res.json());
    }
    fetchIEXPercent(){
        return fetch(IEX_URL + 'stock/market/list/iexpercent' + this.attrWriter(),{
        method: 'GET'
    })
    .then((res) => res.json());
    }
}


const API = new IEXAPI()
export default API;
if (process.env.NODE_ENV !== 'production') {
    // must use 'require' (import only allowed at top of file)
    window.IEXAPI = API;
}
