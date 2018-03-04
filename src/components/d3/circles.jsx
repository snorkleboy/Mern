
import React from "react";
import * as d3 from "d3";

class Circles extends React.Component {
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
    make({ x,y, name,position, data }) {
        document.getElementById(`d3${name}`).innerHTML = ''
        const div = d3.select("d3Tooltip");
        const divEL = document.getElementById('d3Tooltip')
        const chart = d3.select(`#d3${name}`)
    chart.append("g").selectAll(".dot")
        .data(data)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", ((d) => position[0] + x(new Date(d.date))))
        .attr("cy", (d) => position[1] + y(d.close))
        .attr("r", 1)
        .on("mouseover", function (d) {
            console.log("mouseover", d.date,d.close)

            divEL.innerHTML = `<h1>${d.date}</h1>  <br/>  <h1>Price:${d.close}</h1>  <br/>  <h1>Average:${Math.round(d.ma)}</h1>  <br/>  <h1>RSI:${Math.round(d.rsi)}</h1>`
            divEL.style.left= (d3.event.pageX) + "px";
            divEL.style.top= (d3.event.pageY - 28) + "px";
            divEL.style.opacity = '1'    
        })
        .on("mouseout", function (d) {
            console.log("MOUSEOUT")
            divEL.style.opacity = '0';
        });


    }
}

export default Circles