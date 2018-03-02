
import React from "react";
import * as d3 from "d3";
import Area from '../area';
import Xaxis from '../timeAxis'
import Yaxis from '../yAxis';
export default function VolumeGraph({height, width, xDate,position}) {
    // VOLUME GRAPH
    // 
    const dataGrabber = (entry) => entry.volume
    const volmaxY = d3.max(this.props.data, dataGrabber)
    const volminY = d3.min(this.props.data, dataGrabber)
    console.log("MAXMIN", volmaxY, volminY)
    const y = d3.scaleLog()
        .range([0, height / 10])
        .domain([volminY, volmaxY])

    return (
        <g>
            <Area
                name={'VolumeArea'}
                data={this.props.data}
                dataGrabber={dataGrabber}
                x={xDate}
                y={y}
                classname={"line"}
                width={width}
                height={height}
                position={position}
            />
        </g>
    )
}

//         const volmaxY = d3.max(data, (entry) => entry.volume)
//         const volminY = d3.min(data, (entry) => entry.volume)
//         const volY = d3.scaleLog()
//             .range([0, (chartArea[1]) / 5])
//             .domain([volmaxY, volminY])

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