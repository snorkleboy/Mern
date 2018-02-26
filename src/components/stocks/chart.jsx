
import React from "react";
import * as d3 from "d3";
import Graph from './d3/graph'
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.getData = () => this.props.data ? Object.values(this.props.data) : []
    }

    render() {
        const { data, type, width, ratio } = this.props;
        return (
            <section className='chart'>
                <div className='top Menu'>
                    <select id='timescale' className='timescale'>
                        <option>1d</option>
                        <option>1w</option>
                        <option>1m</option>
                        <option>3m</option>
                        <option>6m</option>
                        <option>1y</option>
                        <option>3y</option>
                        <option>max</option>
                    </select>
                </div>
                <div className='svg-container'>
                    <svg id='chartD3' className='chartD3 svg-content-responsive'>
                        {
                            this.getData().length > 0 ?
                                <Graph
                                    data={this.getData()}
                                    type={'default'}
                                    width={500} 
                                    height={300}
                                />
                            :
                                null
                        }
                        
                    </svg>
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
    componentWillUpdate(newprops){
        console.log('chart update',newprops)
    }
    componentDidMount(){
        
    }
}

export default Chart;
