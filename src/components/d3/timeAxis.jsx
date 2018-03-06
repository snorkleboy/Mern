
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
    make({x, name, position }) {
        document.getElementById(`d3${name}`).innerHTML = ''

        // axis'
        const axisEl = d3.select(`#d3${name}`)
        axisEl.innerHtml = '';
        // x axis
        const xAxis = d3.axisBottom(x).tickSize(-(300), 0, 0).tickFormat(d3.timeFormat("%y-%m-%d"));
        axisEl.attr("transform", "translate("+position[0] + "," + position[1]+")")
            .attr('class', 'x axis')
            .call(xAxis)

    }
}

export default Axis