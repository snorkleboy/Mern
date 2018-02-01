import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from './list';
class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('stock comp',props, props.match.params);
        this.state={data:[]};
    }
    componentDidMount(){
        // fetch(API + DEFAULT_QUERY)
        //     .then(response => response.json())
        //     .then(data => this.setState({ hits: data.hits }));
        // console.log(this.props.match.params.ticker);
        this.props.fetchSymbol(this.props.match.params.ticker)
        .then((data)=>{console.log('det fetch',data); return this.setState({'data':data})})
    }
    componentDidUpdate(newProps,oldProps){
        // console.log('stockdetials updating',oldProps,newProps, this.state);
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