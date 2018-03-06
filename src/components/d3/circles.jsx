
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
    make({ x,y, name,position, data,options}) {
        document.getElementById(`d3${name}`).innerHTML = ''
        const div = d3.select("d3Tooltip");
        const divEL = document.getElementById('d3Tooltip')
        const chart = d3.select(`#d3${name}`)
        console.log(data)
        // centered on d.close, rise by d.high-d.close and make height of d.high-d.low
        if (options.candleStick){
            chart.append("g").selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "candleStick") 
                .attr("x", (d) => position[0] + x(new Date(d.date)) )
                .attr("y", (d) => position[1] + y(d.high) )
                .attr("width",2)
                .attr("height", (d) => { return y(d.low) - y(d.high)  })
                .attr("fill", (d)=>d.change >= 0 ? "green" : "red")
                .on("mouseover", function (d) {
                    divEL.innerHTML = `<h1>${d.date}</h1>  <br/>  <h1>Price:$${d.close}</h1>  <br/>  <h1>High:$${d.high}</h1>  <br/><h1>Low:$${d.low}</h1>  <br/><h1>Average:$${Math.round(d.ma, 3)}</h1>  <br/>  <h1>RSI:${Math.round(d.rsi, 1)}</h1>`
                    divEL.style.left = (d3.event.pageX - divEL.clientWidth / 2) + "px";
                    divEL.style.top = (d3.event.pageY - divEL.clientHeight * 1.1) + "px";
                    divEL.style.opacity = '1'
                })
                .on("mouseout", function (d) {
                    divEL.style.opacity = '0';
                });
            // var svg = d3.select('body')
            //     .append('svg')
            //     .attrs({ width: 500, height: 200 });
            // svg.append('rect')
            //     .attrs({ x: 10, y: 10, width: 80, height: 80, fill: 'red' })
            //     .transition()
            //     .duration(5000)
            //     .attrs({ x: 460, y: 150, width: 40, height: 40, fill: 'green' })
        }else{
            chart.append("g").selectAll(".dot")
                .data(data)
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", ((d) => position[0] + x(new Date(d.date))))
                .attr("cy", (d) => position[1] + y(d.close))
                .attr("r", 1)
                .on("mouseover", function (d) {
                    divEL.innerHTML = `<h1>${d.date}</h1>  <br/>  <h1>Price:$${d.close}</h1>  <br/>  <h1>Average:$${Math.round(d.ma, 3)}</h1>  <br/>  <h1>RSI:${Math.round(d.rsi, 1)}</h1>`
                    divEL.style.left = (d3.event.pageX - divEL.clientWidth / 2) + "px";
                    divEL.style.top = (d3.event.pageY - divEL.clientHeight * 1.1) + "px";
                    divEL.style.opacity = '1'
                })
                .on("mouseout", function (d) {
                    divEL.style.opacity = '0';
                });
        }
    


    }
}

export default Circles