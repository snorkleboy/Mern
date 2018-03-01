
import React from "react";
import * as d3 from "d3";

class Circles extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
        console.log('line con', props);
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
    make({ x,y, name, position, data }) {
        document.getElementById(`d3${name}`).innerHTML = ''

        const chart = d3.select(`#d3${name}`)
    chart.append("g").selectAll(".dot")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", ((d) => x(new Date(d.date))))
        .attr("cy", (d) => y(d.close))
        .attr("r", 1);


    }
}

export default Circles