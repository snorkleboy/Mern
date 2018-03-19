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
            .then(
                (data) => this.setState({ 'data': data }),
            (fail) => alert("couldn't find that ticker")
            );

        this.props.fetchChart(match.params.ticker, '5y').then(
                (data) => this.setState({'chart': data}),
                (fail) => alert("couldn't find that ticker")
            );
    }
    componentDidUpdate(prevprops,prevstate){
    }
    render(){
        return(
            <article className='stock'>
                <section >
                        <Chart name={this.state.data.companyName} data={this.state.chart}/>
                </section>
                <section className='stock-details'>
                    <label> Company Details</label>
                    <Table
                        data={{
                            'headers': info,
                            'entries': this.state.data
                        }}
                    /> 
                    <label>Price Details</label>
                    <Table
                        data={{
                            'headers': prices,
                            'entries': this.state.data
                        }}
                    />
                </section>            

            </article>
        );
    }
    componentWillUpdate(newp, news) {
        if (newp.location.pathname !== this.props.location.pathname) {
            this.getData(newp.match);
        }
    }
    getHeaders(obj) {
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