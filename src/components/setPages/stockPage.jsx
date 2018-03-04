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
    // sums holds [movingSum, MovingsquareSum, NumIncreaseIntervals, NumDecreaseIntervals];
    let sums = getInitialMA(data, avgN)
    for (let i = avgN; i < data.length; i++) {
        // get new sum by removing oldest element and adding new
        // the new 20 day sum is sum - num[-20] + num[i]
        sums[0] = sums[0] - data[i - avgN].close + data[i].close
        sums[1] = sums[1] - (Math.pow(data[i - avgN].close,2)) + (Math.pow(data[i].close,2))
        // calc new moving average as sum/n
        data[i].ma = (sums[0] / avgN)
        //  calc new varaince and then stdev
        const variance = sums[1] / avgN - Math.pow(data[i].ma, 2);//sums[1]/avgn = average square of value; Math.pow(data[i].ma, 2) = squared average/ 
        data[i].stdev = Math.pow(variance,1/2)

        // calc new NumIncreaseIntervals, NumDecreaseIntervals
        // remove one from increases or decreases depending on oldest element.
        if (data[i-avgN].change >= 0){
            sums[2] = sums[2] - data[i-avgN].change
        }else{
            sums[3] = sums[3] +data[i-avgN].change
        }
        // add on to increases or decreases depending on new element
        const change = data[i].close - data[i - 1].close
        if (change>0){
            sums[2] += change
        }else{
            sums[3] += -change
        }
        // rawrsi is average increases/average decreases 
        data[i].rsi = (sums[2] / i) / (sums[3] / i)
        //  end-rsi = 100 - (100/(1+rawrsi))
        //  if rawrsi = large then end-rsi will = 100: ( 100 - 100/infinity)
        //  if rawrsi = 0 then end-rsi will = 0: (100 - 100/(1))
        data[i].rsi = 100 - 100 / (1 + data[i].rsi)
    }

    return data
}
// gets first N values of rollig sums and averages and stdevs. 
// instead of using N for averages it uses i for each value
// so first elements moving average = first_element.closingprice/(i+1) i=0
//  second eleemnts moving average = first_el
function getInitialMA(data, n) {
    data[0].ma = data[0].close;
    data[0].change = 0;
    data[0].rsi = 50
    let sum = data[0].close;
    let squareSum = data[0].close*data[0].close;
    let gainsTot = 1;
    let lossesTot =1;
    for (let i = 1; i < n; i++) {
        sum += data[i].close
        squareSum += data[i].close * data[i].close
        data[i].ma = sum / (i + 1)
        const var2 = squareSum / i - Math.pow(data[i].ma, 2);
        data[i].stdev = Math.pow(var2,1/2)

        // get total numver of increase and decreases for RSI
        // average is calculated using N instead of I for these first N values;
        const change = data[i].close-data[i-1].close
        if (change >= 0){
            gainsTot += change
        }else{
            lossesTot += -change
        }
        // data[i].change = change;
        data[i].rsi = (gainsTot/n)/(lossesTot/n)
        
        data[i].rsi = 100 - 100/(1+data[i].rsi)
        console.log('g l ag/av rsi',gainsTot, lossesTot, n, (gainsTot / n) / (lossesTot / n), data[i].rsi)
    }
    return [sum, squareSum, gainsTot, lossesTot];
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