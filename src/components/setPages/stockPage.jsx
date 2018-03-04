import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from '../stocks/list';
import Chart from '../stocks/chart'
import Table from '../stocks/table';

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state={data:[],chart:[]};
    }
    componentDidMount(){
        this.getData(this.props.match);
    }
    getData(match){
        this.props.fetchSymbol(match.params.ticker)
            .then((data) => this.setState({ 'data': data }));

        this.props.fetchChart(match.params.ticker, '5y').then((data) => this.setState({ 'chart': data }));
    }
    componentDidUpdate(newProps,oldProps){
    }
    render(){
        return(
            <main className='stock'>
                <section >
                        <Chart data={this.state.chart}/>
                </section>
                <section>
                    <h1> detail info</h1>
                    <Table
                        data={{
                            'headers': info,
                            'entries': this.state.data
                        }}
                    /> 
                    <h1>price info</h1>
                    <Table
                        data={{
                            'headers': prices,
                            'entries': this.state.data
                        }}
                    />
                </section>            

            </main>
        );
    }
    componentWillUpdate(newp, news) {
        if (newp.location.pathname !== this.props.location.pathname) {
            this.getData(newp.match);
        }
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