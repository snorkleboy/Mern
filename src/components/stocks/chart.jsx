
import React from "react";
import * as d3 from "d3";
import Graph from './d3/graph'

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
                    <svg id='d3Top' className='chartD3 svg-content-responsive'>

                        {
                            data.length > 0 ?
                                <Graph
                                    data={dataSlice}
                                    type={type}y
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
    
    componentDidUpdate(oldprops,prevstate){
        let chart = d3.select("#d3Top")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
    }
    componentDidMount(){
        
    }

    handleTimeChange(e){
        e.preventDefault();
        this.setState({"range":e.target.value})
    }
}

export default Chart;
