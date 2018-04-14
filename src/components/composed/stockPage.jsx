import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from '../stocks/list';
import Chart from '../stocks/chart'
import Table from '../stocks/table';
import IexNews from '../rss/iexNews';
import {
    processMinuteDate,
    addAnalysis
} from '../../util/stockAnalysis'

const analysisRanges = [20, 50, 200]

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], chart: [], news: [], minuteChart:[]};
    }
    componentDidMount(){
        this.getData(this.props.match);
    }
    getData(match){
        const fetches = [
            this.props.fetchChart(match.params.ticker, '5y'),
            this.props.fetchSymbol(match.params.ticker),
            this.props.fetchNews(match.params.ticker),
            this.props.fetchChartMinutes(match.params.ticker, 14)

        ]
        Promise.all(fetches)
        .then((data)=>{
            data[0] = addAnalysis(data[0],[20,50,200]);
            data[3] = processMinuteDate(data[0],data[3]);
            this.setState({ "chart": data[0],"data": data[1], "news": data[2], "minuteChart":data[3] })
        })
        .catch(err=>{
            alert("couldn't find that ticker")
            console.log("stock page error",err);
        })
    }
    componentDidUpdate(prevprops,prevstate){
    }
    render(){
        return(
            <section className='stock'>
                <section >
                        <Chart name={this.state.data.companyName} data={this.state.chart} minuteData={this.state.minuteChart}/>
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
                <section className="iex-news">
                    <h1> News</h1>
                    {this.state.news.map(article => <IexNews key={article.url} article={article}/>)}
                </section>          

            </section>
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