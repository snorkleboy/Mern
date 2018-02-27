import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from './list';
import Chart from './chart'
import Table from './table';

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

        this.props.fetchChart(match.params.ticker, '5y').then((data) => this.setState({ 'chart': addMa(data,14) }));
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
        console.log("WILLUPDATE STOCKS", newp, this.props)
        if (newp.location.pathname !== this.props.location.pathname) {
            console.log("REFTECHING", newp, this.props)
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
function addMa(data, avgN) {
    const first = [[], []]

    console.log('calc ma', avgN,data)
    let sums = getInitialMA(data, avgN)
    for (let i = avgN; i < data.length; i++) {
        // the new 20 day sum is sum - num[-20] + num[i]
        sums[0] = sums[0] - data[i - avgN].close + data[i].close
        sums[1] = sums[1] - (data[i - avgN].close * data[i - avgN].close) + (data[i].close * data[i].close)
        data[i].ma = (sums[0] / avgN)
        const var2 = sums[1] / avgN - Math.pow(data[i].ma, 2);
        data[i].stdev = Math.pow(var2,1/2)
        console.log(data[i].stdev,var2,Math.pow(var2,1.2))
    }
    console.log('calc ma done', avgN, data)

    return data
}

function getInitialMA(data, n) {
    data[0].ma = data[0].close;
    let sum = data[0].close;
    let squareSum = data[0].close*data[0].close;
    for (let i = 1; i < n; i++) {
        sum += data[i].close
        squareSum += data[i].close * data[i].close
        data[i].ma = sum / (i + 1)
        const var2 = squareSum / i - Math.pow(data[i].ma, 2);
        data[i].stdev = Math.pow(var2,1/2)
    }
    return [sum,squareSum];
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