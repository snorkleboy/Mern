import * as StockAPI from '../../util/stockAPI.js';
import IEXAPI from '../../util/IEXAPI';

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

export const receiveStocksFromIEX = (stocks) => ({
    type: RECEIVE_STOCKS,
    payload: stocks,
    source: "IEX"
});


export const FetchStocks = (string) => dispatch => StockAPI.FetchStocks(string)
    .then((success) => dispatch(receiveStocks(success)),
    (fail) => console.log(fail));





