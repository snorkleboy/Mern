
import React from "react";
import * as d3 from "d3";
import Line from '../line';
import Xaxis from '../timeAxis'
import Yaxis from '../yAxis';

export default function RSIGraph({height, width, xDate,position}) {
    // RSI GRAPH
    const datagrabber = (entry) => entry.rsi;
    const maxY = d3.max(this.props.data, datagrabber)
    const minY = d3.min(this.props.data, datagrabber)
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([minY, maxY]);
    return (
        <g>
            <Line
                name={'RSILine'}
                data={this.props.data}
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
                ticks={2}
                position={[position[0] + width, position[1]]}
            />
        </g>
    )
}