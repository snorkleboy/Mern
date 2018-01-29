export const FetchStocks = () => fetch('https://www.quandl.com/api/v3/datasets/EOD/AAPL.json?api_key=77ku-us9zDe-maSwnkXx',
{
    method:'GET'
})
.then((res)=>res.json());
export const GetStocks = () => fetch('/api/stocks');
export const SaveStocks = (stocks) => fetch('/api/events',{
    method:"post",
    body:stocks,
});