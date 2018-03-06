
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
        const divEL = document.getElementById('d3Tooltip')
        const chart = d3.select(`#d3${name}`)
        chart.selectAll('.child').transition().duration(400).attr('r', .1).attr("height",0).remove()


        // this function starts the process of making data bound d3 elements
        function maker(el,dataa,classname){
            return el.selectAll(classname)
                .data(dataa)
        }

        const toolTipper = function (d) {
            divEL.innerHTML = `<h1>${d.date}</h1>  <br/>  <h1>Close:$${d.close}</h1>  <br/> <h1>Open:$${d.open}</h1><br/> <h1>High:$${d.high}</h1>  <br/><h1>Low:$${d.low}</h1>  <h1>Average:$${Math.round(d.ma, 3)}</h1>  <br/>  <h1>RSI:${Math.round(d.rsi, 1)}</h1>`
            divEL.style.left = (d3.event.pageX - divEL.clientWidth / 2) + "px";
            const topPosition = d3.event.pageY - divEL.clientHeight * 1.1
            divEL.style.top = (topPosition > 0 ? topPosition : 0) + "px";
            divEL.style.opacity = '1'
        }
        const deToolTipper = function (d) {
            divEL.style.opacity = '0';
        }

        // if candlesticks option, make candlesticks out of d3 rect type. its centered on d.high, and a hight of high-low (but since Y is reversed on the dom you do low-high)
        // else append circles circles centered on d.close
        // bind the tooltips after
        let dataObj = null;
        if (options.candleStick) {
            dataObj = maker(chart, data, '.bar')
            dataObj.enter().append("rect")
                .attr("class", "candleStick child")
                .attr("x", (d) => position[0] + x(new Date(d.date)))
                .attr("y", (d) => position[1] + y(d.high))
                .attr("width", 1.5)
                .attr("fill", (d) => d.change >= 0 ? "green" : "red")
                .on("mouseover", toolTipper)
                .on("mouseout", deToolTipper)
                .transition()           // apply a transition
                .duration(1000)
                .attr("height", (d) => { return y(d.low) - y(d.high) })
        }
        if (options.pricePoint) {
            dataObj = maker(chart, data, '.dot')
            dataObj.enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot child") // Assign a class for styling
                .attr("cx", ((d) => position[0] + x(new Date(d.date))))
                .attr("cy", (d) => position[1] + y(d.close))
                .attr("r", .1)
                .on("mouseover", toolTipper)
                .on("mouseout", deToolTipper)
                .transition()           // apply a transition
                .duration(450)
                .attr("r", 1.3)
        }
    


    }
}

export default Circles