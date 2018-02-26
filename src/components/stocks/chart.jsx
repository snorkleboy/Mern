
import React from "react";
import * as d3 from "d3";
class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = { "data" : Object.values(this.props.data)}
        // console.log('chart con',props);
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
        
        console.log('here',this.state.data)

        setupPriceLineChart(this.state.data,width,ratio)
        

    }
}

function setupPriceLineChart(allEntries,width, ratio){

    const MARGINS = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    const formatDate = d3.timeFormat("%Y-%m-%d")


    const chart = d3.select("#chartD3")
        .attr('width', width)
        .attr("height", width * ratio)
    const last = allEntries.length - 1

    const x = d3.scaleTime()
        .range([width, 0])
        .domain([new Date(allEntries[last].date), new Date(allEntries[0].date)]);

    let maxY = d3.max(allEntries, (entry) => entry.close) * 1.1
    let minY = d3.min(allEntries, (entry) => entry.close) * .9
    const y = d3.scaleLinear()
        .range([width * ratio, 0])
        .domain([minY, maxY]);


    maxY = d3.max(allEntries, (entry) => entry.volume)
    minY = d3.min(allEntries, (entry) => entry.volume)
    const volY = d3.scaleLog()
        .range([0,(width * ratio)/5])
        .domain([maxY,minY])

    const area = d3.area()
        .x(function (d) { return x(new Date(d.date)); })
        .y1(function (d) { return volY(d.volume); })
        .y0(y(0))

    const line = d3.line()
        .x((data) => x(new Date(data.date)))
        .y((data) => y(data.close))


    // //volume
    chart.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + ((width * ratio - (width * ratio)/5) - 2*MARGINS.bottom)  + ")")
        .append('svg')
        .attr('width', width)
        .attr("height", (width * ratio)/5)
        .append("path")
        .datum(allEntries)
        .attr("class", "volume")
        .attr("d", area)
    // price line
    chart.append("g")
        .append("path")
        .attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
        .datum(allEntries)
        .attr("class", "line")
        .attr("d", line)
    // axis'
    const axis = chart.append("g")
    // y axis
    axis.append("g")
        .attr('class', 'y axis')
        .attr("transform", "translate(" + 0 + "," + (MARGINS.bottom) + ")")
        .call(d3.axisRight(y));
    // x axis
    axis.append("g")
        .attr("transform", "translate(0," + (width * ratio - MARGINS.bottom*2) + ")")
        .attr('class', 'x axis')
        .call(d3.axisBottom(x));
    // price line dots?
    chart.selectAll(".dot")
        .data(allEntries)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", ((data) =>  MARGINS.left+ x(new Date(data.date))))
        .attr("cy", (data) => MARGINS.bottom + y(data.close))
        .attr("r", 1);

}

function getDates(data){
    return data.map((datepoint)=> datepoint.date)
}

export default Chart;
