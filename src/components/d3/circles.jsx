
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
        // this function starts the process of making data bound d3 elements
        function maker(el,dataa,classname){
            return el.append("g").selectAll(classname)
                .data(dataa)
        }
        // this function takes in a d3 element and calls .on() for tooltips
        function binder(el){
            const toolTipper = function (d) {
                divEL.innerHTML = `<h1>${d.date}</h1>  <br/>  <h1>Price:$${d.close}</h1>  <br/>  <h1>High:$${d.high}</h1>  <br/><h1>Low:$${d.low}</h1>  <br/><h1>Average:$${Math.round(d.ma, 3)}</h1>  <br/>  <h1>RSI:${Math.round(d.rsi, 1)}</h1>`
                divEL.style.left = (d3.event.pageX - divEL.clientWidth / 2) + "px";
                divEL.style.top = (d3.event.pageY - divEL.clientHeight * 1.1) + "px";
                divEL.style.opacity = '1'
            }
            const deToolTipper = function (d) {
                divEL.style.opacity = '0';
            }
            el.on("mouseover", toolTipper)
                .on("mouseout", deToolTipper);
        }

        // if candlesticks option, make candlesticks out of d3 rect type. its centered on d.high, and a hight of high-low (but since Y is reversed on the dom you do low-high)
        // else append circles circles centered on d.close
        // bind the tooltips after
        let obj = null;
        if (options.candleStick) {
            obj = maker(chart, data, '.bar')
                .enter().append("rect")
                .attr("class", "candleStick")
                .attr("x", (d) => position[0] + x(new Date(d.date)))
                .attr("y", (d) => position[1] + y(d.high))
                .attr("width", 2)
                .attr("height", (d) => { return y(d.low) - y(d.high) })
                .attr("fill", (d) => d.change >= 0 ? "green" : "red")

            maker(chart, data, '.barTick')
                .enter().append("rect")
                .attr("class", "candleStick")
                .attr("x", (d) => position[0] + x(new Date(d.date)))
                .attr("y", (d) => position[1] + y(d.close))
                .attr("width", 2)
                .attr("height", .6)
                .attr("fill", "grey")
        }
        if (options.pricePoint) {
            
            obj = maker(chart, data, 'dot')
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", ((d) => position[0] + x(new Date(d.date))))
                .attr("cy", (d) => position[1] + y(d.close))
                .attr("r", 1.3)
        }
        if (obj) binder(obj)
    


    }
}

export default Circles