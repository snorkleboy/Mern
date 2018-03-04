
import React from "react";
import * as d3 from "d3";
class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
    }
    render() {
        return (
            <svg id={`d3${this.props.name}`}>

            </svg>

        );
    }
    componentDidMount() {
        this.make(this.props);
    }
    componentWillReceiveProps(nextprops) {
        this.make(nextprops);
    }
    shouldComponentUpdate() {
        return false;
    }
    make({ data, dataGrabber, x, fudge, axis }) {
        // price line
        const maxY = d3.max(data, (entry) => entry.close) * 1.1
        const minY = d3.min(data, (entry) => entry.close) * .95
        const y = d3.scaleLinear()
            .range([chartArea[1] - MARGINS.vert(), 0])
            .domain([minY, maxY]);

        const priceLine = d3.line()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(d.close))

        chart.append("g")
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", priceLine)

    }
}