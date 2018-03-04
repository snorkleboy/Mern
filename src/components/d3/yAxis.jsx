
import React from "react";
import * as d3 from "d3";

class Axis extends React.Component {
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
    make({ y, name, position,ticks,label, }) {
        document.getElementById(`d3${name}`).innerHTML = ''

        // axis'
        const axisEl = d3.select(`#d3${name}`)
        axisEl.innerHtml = '';

        const axis = d3.axisRight(y).ticks(ticks, ".2s").tickSize(-(500), 0, 0)
        axisEl.attr('class', 'y axis')
        .attr("transform", "translate(" + position[0] + "," + position[1] + ")")
        .call(axis);



    }
}

export default Axis