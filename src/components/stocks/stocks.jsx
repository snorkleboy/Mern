import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from './list';
import Chart from './chart';

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state={data:[],chart:[]};
    }
    componentDidMount(){
        this.props.fetchSymbol(this.props.match.params.ticker)
        .then((data)=>this.setState({'data':data}));

        this.props.fetchChart(this.props.match.params.ticker,'5y').then((data)=>this.setState({'chart':data}));
    }
    componentDidUpdate(newProps,oldProps){
    }
    render(){
        return(
            <div className='stocks'>
                <main className='graphs'>
                    <div className='primaryGraph'>primaryGraph        </div>
                    <div className='secondaryGraph'>secondaryGraph</div>
                    <Link to='/stocks/ticker'>tickerLINK</Link>
                    <Link to='/stocks/123'>idLINK</Link>

                </main>
                <main>
                    <div className='stats'>stats</div>
                    <div className='options'>options</div>
                    <h1> detail info</h1>
                    <List
                        data={{
                            'headers': info,
                            'entries': [this.state.data]
                        }}
                    /> 
                    <h1>price info</h1>
                    <List
                        data={{
                            'headers': prices,
                            'entries': [this.state.data]
                        }}
                    />
                    <h1>chart attempt</h1>
                    {this.state.chart.length>0 ?
                        (<Chart data={this.state.chart} width={1000} ratio={.5} />)
                        :
                            `LOADING
                            LOADING
                            LOADING
                            LOADING`
                    }
                    <h1> chart data</h1>


                </main>            

            </div>
        );
    }
    getHeaders(obj) {
        // console.log('here', Object.keys(obj));
        return (obj) ?
            Object.keys(obj)
            :
            [];
    }


}


// <List
//     data={{
//         'headers': this.getHeaders(this.state.chart[0]),
//         'entries': this.state.chart
//     }}
// />
const info = [
    'symbol',
    'latestEPS',
    'revenue',
    'cash',
    'debt',
    'revenuePerShare',
    'peRatioHigh',
    'peRatioLow',
    'beta',
    'profitMargin',
    'priceToSales',
    'priceToBook',
    'institutionPercent',
    'insiderPercent',
    'shortRatio',
    'profitMargin',
    'priceToSales',
    'priceToBook',
    'shortInterest',
    'dividendYield',
    'sharesOutstanding',
    'float',
    'returnOnEquity',
    'consensusEPS',
    'EPSSurprisePercent',
    'EBITDA',
    'grossProfit',

]
const prices = [
    'day5ChangePercent',
    'day200MovingAvg',
    'day50MovingAvg',
    'marketcap',
    'week52high',
    'week52low',
    'week52change',
    'month6ChangePercent',
    'month3ChangePercent',
    'month1ChangePercent',
    'ytdChangePercent',
    'year5ChangePercent',
    'year2ChangePercent',
    'year1ChangePercent',
    'peRatioHigh',
    'peRatioLow',
]


export default Stocks;