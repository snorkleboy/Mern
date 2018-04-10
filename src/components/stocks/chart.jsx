
import React from "react";
import Graph from './D3graph'
import addAnysis from '../../util/stockAnalysis'
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
            dataSlice = addAnysis(data.slice(data.length - this.state.range, data.length), analRange)
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




export default Chart;
