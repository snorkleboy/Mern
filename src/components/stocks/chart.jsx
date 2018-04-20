
import React from "react";
import Graph from './D3graph'
const width = 500;
const height = 300;
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
                "range": 360,
                "analRange":20,
                'ma': true,
                'bollinger':false,
                'candleStick':false,
                'pricePoint':true
        }
    }
    render() {
        function daysAgoInMinuteEntries(num){
            //390 minutes in trading day
            return 390 * num
        }
        let dataSlice = [];
        if (this.props.data.length > 0){
            if (this.state.range <= 14){
                dataSlice = this.props.minuteData.slice(this.props.minuteData.length - daysAgoInMinuteEntries(this.state.range), this.props.minuteData.length)
            }else{
                dataSlice = this.props.data.slice(this.props.data.length - this.state.range, this.props.data.length)
            }
            
        }
        return (
            <section className='chart'>
                <div className='top menu flex-row'>
                    <select  onChange={this.handleTimeChange.bind(this)} id='timescale' className='clickable timescale'>
                        <option value='1'>1d</option>
                        <option value='7'>1w</option>
                        <option value='14'>2w</option>
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
                            this.props.data.length > 0 ?
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
                            <ul className='chart-options flex-row'>
                                <li>Moving Average
                                        <input onChange={this.handleMAclick.bind(this)} checked={this.state.ma} type="checkbox"></input>
                                </li>

                                <li>Bollinger Bands
                                    <input onChange={this.handleBollingerClick.bind(this)} type="checkbox"></input>
                                </li>
                                <li>Analysis Range
                                    <select onChange={this.handleRangeSelect.bind(this)} value={this.state.analRange}>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                        <option value="off">off</option>
                                    </select>
                                </li>
                                <li>
                                    <label>Price Point Marker</label>
                                <select onChange={this.handleMarkerType.bind(this)}>
                                    <option value="pricePoint">pricePoint</option>
                                    <option value="candleStick">candleStick</option>
                                    <option value="none">none</option>
                                </select>

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
    handleMarkerType(e){
        console.log(e.target.value, this.state);
        const pricePoint = e.target.value === "pricePoint"
        const candleStick = e.target.value === "candleStick"
        this.setState({ "pricePoint": pricePoint, "candleStick": candleStick })
    }
    handlePricePoint() {
        this.setState({ "pricePoint": true, "candleStick": false })
    }
    handleCandleStick(){
        this.setState({ "candleStick": true, "pricePoint": false})
    }
    handleMAclick(e) {
        this.setState({ 'ma': !this.state.ma })
    }
    handleRangeSelect(e){
        this.setState({ 'analRange': e.target.value})
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
