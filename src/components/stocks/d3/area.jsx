
import React from "react";
import * as d3 from "d3";
export default class Area extends React.Component {
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
    make({ data, dataGrabber, x, y, width, height, classname, name, position }) {
        document.getElementById(`d3${name}`).innerHTML = ''

        const chart = d3.select(`#d3${name}`)
        chart.attr("transform", "translate(" + position[0] + "," + position[1] + ")")

        const area = d3.area()
            .x((d) => x(new Date(d.date)))
            .y0(height)
            .y1((d)=> y(d.volume))
        chart.append('svg')
            .attr('width', width)
            .attr("height", height)
            .append("path")
            .datum(data)
            .attr("class", "volume")
            .attr("transform", "translate(" + 0 + "," + height/2 + ")")
            .attr("d", area)
        console.log('area con', data, dataGrabber(data[2]), y(dataGrabber(data[2])));



    }
}
