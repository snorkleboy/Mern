
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
            .x((d,i) => x(i))
            .y1((d) => y(d.volume))
            .y0(y(1))
        chart.append('svg')
            .attr('width', width)
            .attr("height", height)
            .append("path")
            .datum(data)
            .attr("class", "volume")
            .attr("d", area)
    }
}
//         const area = d3.area()
//             .x(function (d) { return x(new Date(d.date)); })
//             .y1(function (d) { return volY(d.volume); })
//             .y0(y(0))

//         chart.append("g")
//             .attr("transform", "translate(" + 0 + "," + (chartArea[1] - chartArea[1] / 5 - MARGINS.bottom) + ")")
//             .append('svg')
//             .attr('width', chartArea[0] - MARGINS.hori())
//             .attr("height", (chartArea[1]) / 5)
//             .append("path")
//             .datum(data)
//             .attr("class", "volume")
//             .attr("d", area)