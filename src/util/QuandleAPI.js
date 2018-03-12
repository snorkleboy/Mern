const key = '77ku-us9zDe-maSwnkXx';
const QuandleApi = () => {};

QuandleApi.prototype.FetchStocksAfter = (ticker, date) => fetch(`https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=${ticker}&date.gt=${date}&api_key=${key}`, {
        method: 'GET'
    })
    .then((res) => res.json());



export default new QuandleApi();