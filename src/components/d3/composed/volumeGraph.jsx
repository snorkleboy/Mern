
import React from "react";
import * as d3 from "d3";
import Area from '../area';
import Yaxis from '../yAxis';
export default function VolumeGraph({data,height, width, xDate,position}) {
    // VOLUME GRAPH
    // 
    const dataGrabber = (entry) => entry.volume
    const volmaxY = d3.max(data, dataGrabber)
    const volminY = d3.min(data, dataGrabber)
    const y = d3.scaleLinear()
        .range([0, height])
        .domain([volmaxY, volminY])

    return (
        <g>
            <Area
                name={'VolumeArea'}
                data={data}
                dataGrabber={dataGrabber}
                x={xDate}
                y={y}
                classname={"line"}
                width={width}
                height={height}
                position={position}
            />
            <Yaxis
                name={'VolumeAreaYaxis'}
                y={y}
                ticks={2}
                position={[position[0] + width, position[1]]}
            />
        </g>
    )
}

//         const volmaxY = d3.max(data, (entry) => entry.volume)
//         const volminY = d3.min(data, (entry) => entry.volume)
//         const volY = d3.scaleLog()
//             .range([0, (chartArea[1]) / 5])
//             .domain([volmaxY, volminY])

