
import React from "react";
import * as d3 from "d3";

class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
    }
    render() {
        return (
            <g id={`d3${this.props.name}`}>

            </g>

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
    make({x, name, position,data }) {
        const domain = [new Date(data[data.length - 1].date), new Date(data[0].date)]
        const timeFormat = (domain[1].getDate()===domain[0].getDate()) ? d3.timeFormat("%I:%M") : d3.timeFormat("%y/%m/%d")
        const xDate = d3.scaleTime()
            .range(x.range())
            .domain(domain)
        document.getElementById(`d3${name}`).innerHTML = ''
        // axis'
        const axisEl = d3.select(`#d3${name}`)
        axisEl.innerHtml = '';
        // x axis
        const xAxis = d3.axisBottom(xDate).tickSize(-(300), 0, 0).tickFormat(timeFormat);
        axisEl.attr("transform", "translate(" + position[0] + "," + position[1] + ")")
            .attr('class', 'x axis')
            .call(xAxis)

    }
}

export default Axis