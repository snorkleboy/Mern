
import React from "react";
import * as d3 from "d3";
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { "data" : Object.values(this.props.data)}
        console.log('chart con',props);
    }

    render() {
        const { data, type, width, ratio } = this.props;
        return (
            <svg id='chartD3' className='chartD3'>

            </svg>
        );
    }

    componentDidMount(){
        const { type, width, ratio } = this.props;
        const formatDate = d3.timeFormat("%Y-%m-%d")
        console.log()
        console.log('here',this.state.data)


       const MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        }

        const chart = d3.select("#chartD3")
            .attr('width',width)
            .attr("height", width * ratio)
            .append("g")
        const last = this.state.data.length -1
        const x = d3.scaleTime()
        .range([width, 0])
        .domain([new Date(this.state.data[last].date), new Date(this.state.data[0].date)]);
        // console.log('dates', new Date(this.state.data[last].date),[new Date(this.state.data[last].date), new Date(new Date(this.state.data[0].date))],x(new Date(this.state.data[last].date)))
        const max = d3.max(this.state.data, (entry)=>entry.close)
        const min = d3.min(this.state.data, (entry) => entry.close)
        const y = d3.scaleLinear()
        .range([width * ratio, 0])
        .domain([max,min]);

        const line = d3.line()
            .x((data) => x(new Date(data.date)) )
            .y((data)=> y(data.close) )
        // price line
        chart.append("path")
            .datum(this.state.data)
            .attr("class", "line")
            .attr("d", line)
        // x axis
        chart.append("g")
            .attr("transform", "translate(0," + width*ratio + ")")
            .attr('class', 'x axis')
            .call(d3.axisBottom(x)); 
        // price line dots?
        chart.selectAll(".dot")
            .data(this.state.data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", ((data)=> x(new Date(data.date))))
            .attr("cy", (data) => (data.close))
            .attr("r", 5);


    }
}

function getDates(data){
    return data.map((datepoint)=> datepoint.date)
}

export default Chart;
