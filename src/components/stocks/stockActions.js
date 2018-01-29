import * as StockAPI from '../../util/stockAPI.js';
import IEXAPI from '../../util/IEXAPI';

export const thunker = (fetchFunc, action = receiveStocksFromIEX) => () => dispatch => fetchFunc().then((success) => dispatch(action(success)),
    (fail) => console.log(fail));

export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_SAVED_STOCKS = 'RECEIVE_SAVED_STOCKS';

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
    source: "IEX"
});
export const receiveGainers = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: {gainers:stocks},
    source: "IEX losers"
});
export const receiveLosers = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: { losers: stocks },
    source: "IEX losers"
});
export const receiveMostActive = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: { mostActive: stocks },
    source: "IEX mostactive"
});

export const receiveMostVolume = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: { mostVolume: stocks },
    source: "IEX mostvolume"
});

// getGainers: () => dispatch(StockActions.getGainers()),
//     getLosers: () => dispatch(StockActions.getLosers()),
//         getVolumes: () => dispatch(StockActions.getVolumes()),
//             getMostActives: () => dispatch(StockActions.getMostActives()
export const getGainers = thunker(IEXAPI.fetchGainers, receiveGainers);
export const getLosers = thunker(IEXAPI.fetchLosers, receiveLosers);
export const getVolumes = thunker(IEXAPI.fetchIEXVolume, receiveMostActive);
export const getMostActives = thunker(IEXAPI.fetchMostActive, receiveMostVolume);

export const FetchStocks = (string) => dispatch => StockAPI.FetchStocks(string)
    .then((success) => dispatch(receiveStocks(success)),
    (fail) => console.log(fail));





