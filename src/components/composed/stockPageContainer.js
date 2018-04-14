import { connect } from 'react-redux';
import { withRouter } from 'react-router'


import * as StockActions from '../stocks/stockActions';
import IEXAPI from '../../util/IEXAPI';
import StockPage from './stockPage';
const IEX_DETAILS=[
'companyName'	,
'marketcap'	,
'beta'	,
'week52high'	,
'week52low'	,
'week52change'	,
'shortInterest'	,
'dividendYield'	,
'latestEPS'	,
'sharesOutstanding'	,
'float'	,
'returnOnEquity'	,
'consensusEPS'	,
'EPSSurprisePercent'	,
'symbol'	,
'EBITDA'	,
'revenue'	,
'grossProfit'	,
'cash'	,
'debt'	,
'revenuePerShare'	,
'peRatioHigh'	,
'peRatioLow'	,
'profitMargin'	,
'priceToSales'	,
'priceToBook'	,
'day200MovingAvg'	,
'day50MovingAvg'	,
'institutionPercent'	,
'insiderPercent'	,
'shortRatio'	,
'year5ChangePercent'	,
'year2ChangePercent'	,
'year1ChangePercent'	,
'ytdChangePercent'	,
'month6ChangePercent'	,
'month3ChangePercent'	,
'month1ChangePercent'	,
'day5ChangePercent'
]

const API = new IEXAPI(IEX_DETAILS);
// API.setFilters([

// ]);
const mapState = (state, Ownprops) =>{
    return({

    });
};
const mapDispatch = (dispatch, ownProps)=>{
    
    return({
        fetchNews: (symbol) => API.fetchNews(symbol),
        fetchSymbol: (symbol) => API.fetchDetails(symbol),
        fetchChart: (symbol,time) => API.fetchChart(symbol,time),
        fetchChartMinutes: (symbol,days) => API.fetchChartMinutes(symbol,days)
    });
};

export default withRouter(connect(mapState, mapDispatch)(StockPage));