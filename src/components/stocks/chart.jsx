
import React from "react";
import * as d3 from "d3";
import Graph from './d3/graph'
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { "range": 5000}
        
    }
    function
    render() {
        const { data, width, ratio } = this.props;
        const type = { 'volume': true }
        return (
            <section className='chart'>
                <div className='top Menu'>
                    <select onChange={this.handleTimeChange.bind(this)} id='timescale' className='timescale'>
                        <option value='1'>1d</option>
                        <option value='7'>1w</option>
                        <option value='30'>1m</option>
                        <option value='90'>3m</option>
                        <option value='180'>6m</option>
                        <option value='360'>1y</option>
                        <option value='720'>3y</option>
                        <option selected="selected" value='5000'>max</option>
                    </select>
                </div>
                <div className='svg-container'>
                        {
                            data.length > 0 ?
                                <Graph
                                    data={data.slice(data.length-this.state.range,data.length)}
                                    type={type}
                                    width={500} 
                                    height={300}
                                />
                            :
                                null
                        }
                </div>
                
                <div className='bottom Menu'>
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
    componentWillUpdate(newp,news){
        console.log('willUpdate',news);
    }
    componentDidUpdate(oldprops,prevstate){
    }
    componentDidMount(){
        
    }

    handleTimeChange(e){
        e.preventDefault();
        this.setState({"range":e.target.value})
    }
}

export default Chart;
