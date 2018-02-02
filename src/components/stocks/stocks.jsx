import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chart.css';
import List from './list';
import Chart from './chart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('stock comp',props, props.match.params);
        this.state={data:[],chart:[]};
    }
    componentDidMount(){
        this.props.fetchSymbol(this.props.match.params.ticker)
        .then((data)=>this.setState({'data':data}));

        this.props.fetchChart(this.props.match.params.ticker,'3m').then((data)=>this.setState({'chart':data}));
    }
    componentDidUpdate(newProps,oldProps){
        // console.log('stockdetials updating',oldProps,newProps, this.state);
    }
    render(){
        var parseTime = timeParse("%Y %m %d");
        const testdata = [{ 'date': new Date("2017-10-30"), 'close': 123 }, { 'date': new Date("2017-11-30"),'close':321}]


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
                            (<TypeChooser>
                            {type => <Chart type={type} data={this.state.chart} />}
                            </TypeChooser>)
                        :
                            'loading'
                    }
                    <h1> chart data</h1>
                    <List
                        data={{
                            'headers': this.getHeaders(this.state.chart[0]),
                            'entries':this.state.chart
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