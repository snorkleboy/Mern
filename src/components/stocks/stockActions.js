import * as StockAPI from '../../util/stockAPI.js';
import IEXAPI from '../../util/IEXAPI';

export const thunker = (fetchFunc, action = receiveStocksFromIEX) => () => dispatch => fetchFunc().then((success) => dispatch(action(success)),
    (fail) => console.log(fail));

export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_STOCKS_LIST = 'RECEIVE_STOCKS_LIST';
export const RECEIVE_SAVED_STOCKS = 'RECEIVE_SAVED_STOCKS';
export const RECEIVE_MOSTS = 'RECEIVE_MOSTS'

export const receiveSavedStocks = (stocks) => ({
    type: RECEIVE_SAVED_STOCKS,
    payload: stocks
});

export const receiveStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: stocks,
    source: "MONGO"
});

export const receiveStocksFromQuandl = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: stocks,
    source: 'QUANDL'
});


// const _stocks = {
//     gainers:[],
//     losers:[],
//     mostActive:[],
//     mostVolume:[]
// };


export const receiveStocksFromIEX = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: stocks,
    source: 'IEX'
});
export const receiveMosts = (mosts) => ({
    type: RECEIVE_STOCKS_LIST,
    payload: mosts,
    source: "mongo"
});
export const receiveGainers = (stocks) => ({
    type: RECEIVE_STOCKS_LIST,
    payload: {gainers:stocks},
    source: "iex gainers"
});
export const receiveLosers = (stocks) => ({
    type: RECEIVE_STOCKS_LIST,
    payload: { losers: stocks },
    source: "iex losers"
});
export const receiveMostActive = (stocks) => ({
    type: RECEIVE_STOCKS_LIST,
    payload: { mostActive: stocks },
    source: "iex active"
});

export const receiveMostVolume = (stocks) => ({
    type: RECEIVE_STOCKS_LIST,
    payload: { mostVolume: stocks },
    source: "iex most volume"
});

//MONGO FETCHES
export const getMosts = () => dispatch => StockAPI.FetchMosts()
    .then((res) => dispatch(receiveMosts(res)))

//IEXAPI FETCHES
export const getGainers = IEXAPI.thunker(IEXAPI.fetchGainers, receiveGainers);
export const getLosers = IEXAPI.thunker(IEXAPI.fetchLosers, receiveLosers);
export const getVolumes = IEXAPI.thunker(IEXAPI.fetchIEXVolume, receiveMostActive);
export const getMostActives = IEXAPI.thunker(IEXAPI.fetchMostActive, receiveMostVolume);

export const FetchStocks = (string) => dispatch => StockAPI.FetchStocks(string)
    .then((success) => dispatch(receiveStocks(success)),
    (fail) => console.log(fail));
