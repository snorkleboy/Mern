
import React from "react";
import * as d3 from "d3";

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
    }
    render(){
        return(
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
    make({ data, dataGrabber, x,y, width,height,classname,name,position}){
        document.getElementById(`d3${name}`).innerHTML = ''

        let chart = d3.select(`#d3${name}`)

        chart.attr("transform", "translate("+ position[0]+"," + position[1] + ")")
        chart.innerHtml = '';

        const line = d3.line()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(dataGrabber(d)))

        chart.append("svg")
            .attr('width',width)
            .attr('height',height)
            .append("path")
            .datum(data)
            .attr("class", classname)
            .attr("d", line)
    }
}

export default Line