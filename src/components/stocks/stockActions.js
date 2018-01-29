import * as StockAPI from '../../util/stockAPI.js';


export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_SAVED_STOCKS = 'RECEIVE_SAVED_STOCKS';

const receiveSavedStocks = (events) => ({
    type: RECEIVE_SAVED_STOCKS,
    payload: events
});
const receiveStocks = (events) => ({
    type: RECEIVE_STOCKS,
    payload: events
});

const testrec = function(data, cb){
    console.log('received data',data);
    cb();
};
export const GetStock = (id) => dispatch => StockAPI.GetStocks(id)
    .then((success) => testrec(success, () => (dispatch(receiveStocks(success))),
    (fail) => console.log(fail)));

export const FetchStocks = (string) => dispatch => StockAPI.FetchStocks(string)
    .then((success) => dispatch(receiveStocks(success)),
    (fail) => console.log(fail));

export const SaveStocks = (stocks) => dispatch => StockAPI.SaveStocks(stocks)
    .then((success) => testrec(success, () => (dispatch(receiveSavedStocks(success))),
        (fail) => console.log(fail)));