
import React from "react";
import Graph from './D3graph'

const width = 500;
const height = 300;
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
                "range": 720,
                'ma': true,
                'bollinger':false,
                'candleStick':false,
                'pricePoint':true
        }
        
    }
    
    render() {
        const { data, ratio } = this.props;
        let analRange;
        if ( this.state.range < 190){
            analRange = 14
        }else if (this.state.range < 11000){
            analRange = 50
        }else{ 
            analRange = 200
        }

        let dataSlice = [];
        if (data.length > 0){
            dataSlice = addMa(data.slice(data.length - this.state.range, data.length), analRange)
        }
        return (
            <section className='chart'>
                <div className='top menu'>
                    <select  onChange={this.handleTimeChange.bind(this)} id='timescale' className='clickable timescale'>
                        <option value='16'>2w</option>
                        <option value='30'>1m</option>
                        <option value='90'>3m</option>
                        <option value='180'>6m</option>
                        <option selected="selected" value='360'>1y</option>
                        <option value='1080'>3y</option>
                        <option  value='5000'>max</option>
                    </select>
                    <h1>
                        {this.props.name}
                    </h1>
                </div>
                <div className='svg-container'>
                    <svg id='d3Top'
                        className='chartD3 svg-content-responsive'
                        preserveAspectRatio=  "xMinYMin meet"
                        viewBox={`0 0 ${width} ${height}`}
                    >

                        {
                            data.length > 0 ?
                                <Graph
                                    data={(dataSlice)}
                                    options={this.state}
                                    width={width} 
                                    height={height}
                                />
                            :
                                null
                        }
                    </svg>
                    
                </div>
                <div id='d3Tooltip' className='tooltip'>
                </div>
                
                <div className='bottom menu'>
                        <div>
                            <ul>
                                <li>Moving Average
                                    <input onChange={this.handleMAclick.bind(this)} checked={this.state.ma} type="checkbox"></input>
                                </li>
                                <li>Bollinger Bands
                                    <input onChange={this.handleBollingerClick.bind(this)} type="checkbox"></input>
                                </li>
                                <li>Price Point Marker
                                <br/>
                                    <label>Circle Markers<input 
                                    onClick={this.handlePricePoint.bind(this)} 
                                        type="radio"
                                        name='pricePointSelection' 
                                        checked={this.state.pricePoint}>
                                    </input></label>
                                    <label>Candle Sticks<input 
                                        onClick={this.handleCandleStick.bind(this)} 
                                        type="radio"
                                        name='pricePointSelection' 
                                        checked={this.state.candleSticks}>
                                    </input></label>
                                    <label>None<input
                                        onClick={this.handleNone.bind(this)}
                                        type="radio"
                                        name='pricePointSelection'
                                        checked={this.state.candleSticks}>
                                    </input></label>
                                </li>
                            </ul>
                        </div>
                </div>
            </section>
        );
    }
    componentDidUpdate(){
    }
    handleNone(){
        this.setState({ "candleStick": false, "pricePoint": false })
    }
    handlePricePoint() {
        this.setState({ "pricePoint": true, "candleStick": false })
    }
    handleCandleStick(){
        this.setState({ "candleStick": true, "pricePoint": false})
    }
    handleMAclick(){
        this.setState({'ma': !this.state.ma})
    }
    handleBollingerClick(){
        this.setState({ 'bollinger': !this.state.bollinger})
    }
    handleTimeChange(e){
        e.preventDefault();
        this.setState({"range": e.target.value })
    }
}


function addMa(data, avgN) {
    const first = [
        [],
        []
    ]
    // sums holds [movingSum, MovingsquareSum, NumIncreaseIntervals, NumDecreaseIntervals];
    let sums = getInitialMA(data, avgN)
    for (let i = avgN; i < data.length; i++) {
        // get new sum by removing oldest element and adding new
        // the new 20 day sum is sum - num[-20] + num[i]
        sums[0] = sums[0] - data[i - avgN].close + data[i].close
        sums[1] = sums[1] - (Math.pow(data[i - avgN].close, 2)) + (Math.pow(data[i].close, 2))
        // calc new moving average as sum/n
        data[i].ma = (sums[0] / avgN)
        //  calc new varaince and then stdev

        const variance = sums[1] / avgN - Math.pow(data[i].ma, 2); //sums[1]/avgn = average square of value; Math.pow(data[i].ma, 2) = squared average/ 
        data[i].stdev = Math.pow(variance, 1 / 2)

        // calc new NumIncreaseIntervals, NumDecreaseIntervals
        // remove one from increases or decreases depending on oldest element.
        if (data[i - avgN].change >= 0) {
            sums[2] = sums[2] - data[i - avgN].change
        } else {
            sums[3] = sums[3] + data[i - avgN].change
        }
        // add on to increases or decreases depending on new element
        const change = data[i].close - data[i - 1].close
        if (change > 0) {
            sums[2] += change
        } else {
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
function getInitialMA(data, narr) {
    narr = narr.slice();
    data[0].ma={}
    let sum={};
    data[0].stDev = {}
    let squareSum = { }
    const var2 = {};
    sqaureSum[narr[0]]= (data[0].close * data[0].close)
    let largestN = n[n.length-1];
    narr.forEach(n=>{
        data[0].ma[n] = data[0].close
        data[0].stdev[n] = data[0].close * .025;
        squareSum[n] = sqaureSum[narr[0]]
        sum[n] = data[0].close
        var2[n] = undefined;
    })
    // data[0].ma = data[0].close;
    data[0].change = 0;
    data[0].rsi = 50;
    // let sum = data[0].close;
    // let squareSum = data[0].close * data[0].close;
    // data[0].stdev = data[0].close * .025;
    let gainsTot = 1;
    let lossesTot = 1;
    let position = 1;
    for(let j = 0;j<narr.length;j++){
        for (position; i < narr[0]; i++) {
            narr.forEach(n => {
                sum[n] += data[i].close
                squareSum[n] += data[i].close * data[i].close
                data[i].ma[n] = sum[n] / (i + 1)
                var2[n] = squareSum / (i + 1) - Math.pow(data[i].ma, 2);
                data[i].stdev[n] = Math.pow(var2, 1 / 2)
            })
            // sum += data[i].close
            // squareSum += data[i].close * data[i].close
            // data[i].ma = sum / (i + 1)
            // var2 = squareSum / (i + 1) - Math.pow(data[i].ma, 2);
            // data[i].stdev = Math.pow(var2, 1 / 2)

            // get total numver of increase and decreases for RSI
            // average is calculated using N instead of I for these first N values;
            const change = data[i].close - data[i - 1].close
            if (change >= 0) {
                gainsTot += change
            } else {
                lossesTot += -change
            }
            // data[i].change = change;
            data[i].rsi = (gainsTot / n) / (lossesTot / n)

            data[i].rsi = 100 - 100 / (1 + data[i].rsi)
        }
        narr.shift();
    })
    
    return [sum, squareSum, gainsTot, lossesTot];
}



export default Chart;
