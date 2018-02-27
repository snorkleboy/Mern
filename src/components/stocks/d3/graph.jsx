
import React from "react";
import * as d3 from "d3";
class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
        // console.log('chart con',props);
    }

    render() {
        return (
            <svg id='chartD3' className='chartD3 svg-content-responsive'>
            </svg>
        );
    }

    componentDidMount() {
        this.make(this.props);
    }
    componentWillReceiveProps(nextprops){
        this.make(nextprops);
    }
    shouldComponentUpdate(){
        console.log("SHOUDL UPDATE FALSE")
        return false;
    }

    make(props) {
        const { data, type } = props;
        console.log('graph make',data.ticker)
        const chart = document.getElementById('chartD3')
        chart.innerHTML=''
        const chartArea = [props.width, props.height]
        setupPriceLineChart(data, chartArea, type)
    }
}
function setupPriceLineChart(allEntries, chartArea,type) {
    console.log(allEntries)
    const MARGINS = {
        top: 0,
        right: 25,
        bottom: 25,
        left: 0,
        hori: () => MARGINS.right + MARGINS.left,
        vert: () => MARGINS.top + MARGINS.bottom
    }
    const formatDate = d3.timeFormat("%Y-%m-%d")
    
    let chart = d3.select("#chartD3")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${chartArea[0]} ${chartArea[1]}`)

    chart = chart.append("g").attr("transform", "translate(" + MARGINS.left + "," + -MARGINS.bottom + ")")
    const last = allEntries.length - 1

    const x = d3.scaleTime()
        .range([chartArea[0]- MARGINS.hori(), 0])
        .domain([new Date(allEntries[last].date), new Date(allEntries[0].date)]);

    // price line
    const maxY = d3.max(allEntries, (entry) => entry.close) * 1.1
    const minY = d3.min(allEntries, (entry) => entry.close) * .95
    const y = d3.scaleLinear()
        .range([chartArea[1] - MARGINS.vert(), 0])
        .domain([minY, maxY]);

    const priceLine = d3.line()
        .x((data) => x(new Date(data.date)))
        .y((data) => y(data.close))

    chart.append("g")
        .append("path")
        .datum(allEntries)
        .attr("class", "line")
        .attr("d", priceLine)

    //moving average
    const MAline = d3.line()
        .x((data) => x(new Date(data.date)))
        .y((data) => y(data.ma))

    const MALineUp = d3.line()
        .x((data) => x(new Date(data.date)))
        .y((data) => y(data.ma + 2*data.stdev))

    const MALineDown = d3.line()
        .x((data) => x(new Date(data.date)))
        .y((data) => y(data.ma - 2 * data.stdev))
    chart.append("g")
        .append("path")
        .datum(allEntries)
        .attr("class", "MA")
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", MALineUp)
    chart.append("g")
        .append("path")
        .datum(allEntries)
        .attr("class", "MA down")
        .style("stroke-dasharray", ("5, 5"))
        .attr("d", MALineDown)
    chart.append("g")
        .append("path")
        .datum(allEntries)
        .attr("class", "MA up")
        .style("stroke-dasharray", ("5, 5"))
        .attr("d", MAline)



    // //volume
    if (type['volume']){
        const volmaxY = d3.max(allEntries, (entry) => entry.volume)
        const volminY = d3.min(allEntries, (entry) => entry.volume)
        const volY = d3.scaleLog()
            .range([0, (chartArea[1]) / 5])
            .domain([volmaxY, volminY])

        const area = d3.area()
            .x(function (d) { return x(new Date(d.date)); })
            .y1(function (d) { return volY(d.volume); })
            .y0(y(0))

        chart.append("g")
            .attr("transform", "translate(" + 0 + "," + (chartArea[1] - chartArea[1] / 5 - MARGINS.bottom) + ")")
            .append('svg')
            .attr('width', chartArea[0] - MARGINS.hori())
            .attr("height", (chartArea[1]) / 5)
            .append("path")
            .datum(allEntries)
            .attr("class", "volume")
            .attr("d", area)
    }


    // axis'
    const axis = chart.append("g")
    // y axis
    axis.append("g")
        .attr('class', 'y axis')
        .attr("transform", "translate(" + (chartArea[0] - MARGINS.right) + "," + 0 + ")")
        .call(d3.axisRight(y));
    // x axis
    const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%y-%m-%d"));
    axis.append("g")
        .attr("transform", "translate(0," + ((chartArea[1])- MARGINS.bottom)+ ")")
        .attr('class', 'x axis')
        .call(xAxis)
    

    // price line dots?
    chart.selectAll(".dot")
        .data(allEntries)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", ((data) => x(new Date(data.date))))
        .attr("cy", (data) => y(data.close))
        .attr("r", 1);

}

export default Graph;
