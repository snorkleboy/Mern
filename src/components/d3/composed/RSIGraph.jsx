
import React from "react";
import * as d3 from "d3";
import Line from '../line';
import Yaxis from '../yAxis';

export default function RSIGraph({data,height, width, xDate,position}) {
    // RSI GRAPH
    const datagrabber = (entry) => entry.rsi;
    const maxY = d3.max(data, datagrabber)
    const minY = d3.min(data, datagrabber)
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);
    return (
        <g id='RSILine Graph'>
            <Line
                name={'RSILine'}
                data={data}
                dataGrabber={datagrabber}
                x={xDate}
                y={y}
                classname={"line"}
                width={width}
                height={height}
                position={position}
            />
            <Yaxis
                name={'RSIYaxis'}
                y={y}
                explicitTicks={[50]}
                position={[position[0] + width, position[1]]}
            />
        </g>
    )
}