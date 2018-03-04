
import React from "react";
import Graph from './graph'

const width = 500;
const height = 300;
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { "range": 5000}
        
    }

    render() {
        const { data, ratio } = this.props;
        const type = { 'volume': true }
        const dataSlice = data.slice(data.length - this.state.range, data.length)
        return (
            <section className='chart'>
                <div className='top menu'>
                    <select  onChange={this.handleTimeChange.bind(this)} id='timescale' className='clickable timescale'>
                        <option value='30'>1m</option>
                        <option value='90'>3m</option>
                        <option value='180'>6m</option>
                        <option value='360'>1y</option>
                        <option value='720'>3y</option>
                        <option selected="selected" value='5000'>max</option>
                    </select>
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
                                    data={dataSlice}
                                    type={type}
                                    width={width} 
                                    height={height}
                                />
                            :
                                null
                        }
                    </svg>
                </div>
                
                <div className='bottom menu'>
                        <div>
                            <ul>
                                <li>volume</li>
                                <li>bollinger</li>
                            </ul>
                        </div>
                </div>
            </section>
        );
    }
    handleTimeChange(e){
        e.preventDefault();
        this.setState({"range":e.target.value})
    }
}

export default Chart;
