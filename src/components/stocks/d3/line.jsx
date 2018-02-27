
import React from "react";
import * as d3 from "d3";


export default function makeLine({ data, dataGrabber, x, fudge, axis, MARGINS, width, height, classname, name }) {
    const chart = d3.select(`d3${this.props.name}`)
    const maxY = d3.max(data, dataGrabber) * fudge[1]
    const minY = d3.min(data, dataGrabber) * fudge[0]
    const y = d3.scaleLinear()
        .range(height - MARGINS.vert(), 0])
        .domain([minY, maxY]);

    const line = d3.line()
        .x((d) => x(new Date(d.date)))
        .y((d) => y(dataGrabber(x)))

    chart.append("g")
        .append("path")
        .datum(data)
        .attr("class", classname)
        .attr("d", line)

}


class line extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
        // console.log('chart con',props);
    }
    render(){
        return(
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
    make({data,dataGrabber,x,fudge,axis,MARGINS,width,height,classname,name}){
        const chart = d3.select(`d3${this.props.name}`)
        const maxY = d3.max(data, dataGrabber) * fudge[1]
        const minY = d3.min(data, dataGrabber) * fudge[0]
        const y = d3.scaleLinear()
            .range(height - MARGINS.vert(), 0])
            .domain([minY, maxY]);

        const line = d3.line()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(dataGrabber(x)))

        chart.append("g")
            .append("path")
            .datum(data)
            .attr("class", classname)
            .attr("d", line)

    }
}