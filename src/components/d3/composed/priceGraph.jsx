
import React from "react";
import * as d3 from "d3";
import Line from '../line';
import Yaxis from '../yAxis';
import Circles from '../circles';

export default function PriceLine({data,height, width, xDate,position}){
    // PRICE LINE
    // comes with circles which activate toolTips
    // 
    const dataGrabber = (entry) => entry.close;
    const maxY = d3.max(data, dataGrabber)
    const minY = d3.min(data, dataGrabber)
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([minY, maxY]);
    return (
        <g>
            <Line
                name={'priceLine'}
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
                name={'priceLineYaxis'}
                y={y}
                position={[position[0]+width,position[1]]}
            />
            <Circles
                name={'priceDot'}
                dataGrabber={dataGrabber}
                x={xDate}
                y={y}
                data={data}
                position={position}
            />
        </g>
    )
}