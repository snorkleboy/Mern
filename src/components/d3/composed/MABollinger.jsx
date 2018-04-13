
import React from "react";
import * as d3 from "d3";
import Line from '../line';
export default function PriceLine({y,dataGrabber, data, height, width, xDate, position, options }) {
    const ma = ()=>(

    <Line
        name={'priceLineMA'}
        data={data}
        dataGrabber={(d) => d.ma[options.analRange]}
        x={xDate}
        y={y}
        classname={"line MA"}
        width={width}
        height={height}
        position={position}
    />
    )

    const boll = ()=> (
    <g>
        <Line
            name={'priceLineBoll-Bottom'}
            data={data}
            dataGrabber={(d) => d.ma[options.analRange] - d.stdev[options.analRange] * 2}
            x={xDate}
            y={y}
            classname={"line MA bolDown"}
            width={width}
            height={height}
            position={position}
        />
        <Line
            name={'priceLineBoll-Top'}
            data={data}
            dataGrabber={(d) => d.ma[options.analRange] + d.stdev[options.analRange] * 2 }
            x={xDate}
            y={y}
            classname={"line MA bolUp"}
            width={width}
            height={height}
            position={position}
        />
    </g>
    );
    console.log(options);
    return(
        <g id='ma and bollinger'>
            {
                options.ma ? ma() : null
            }
            {
                options.bollinger ? boll() : null
            }
        </g>

    )
}
//     //moving average
//     const MAline = d3.line()
//         .x((d) => x(new Date(d.date)))
//         .y((d) => y(d.ma))

//     const MALineUp = d3.line()
//         .x((d) => x(new Date(d.date)))
//         .y((d) => y(d.ma + 2*d.stdev))

//     const MALineDown = d3.line()
//         .x((d) => x(new Date(d.date)))
//         .y((d) => y(d.ma - 2 * d.stdev))
//     chart.append("g")
//         .append("path")
//         .datum(data)
//         .attr("class", "MA")
//         .style("stroke-dasharray", ("3, 3"))
//         .attr("d", MALineUp)
//     chart.append("g")
//         .append("path")
//         .datum(data)
//         .attr("class", "MA down")
//         .style("stroke-dasharray", ("5, 5"))
//         .attr("d", MALineDown)
//     chart.append("g")
//         .append("path")
//         .datum(data)
//         .attr("class", "MA up")
//         .style("stroke-dasharray", ("5, 5"))
//         .attr("d", MAline)
