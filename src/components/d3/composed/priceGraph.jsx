
import React from "react";
import * as d3 from "d3";
import Line from '../line';
import Yaxis from '../yAxis';
import Circles from '../circles';
import MABollinger from './MABollinger';
export default function PriceLine({data,height, width, xDate,position,options}){
    // PRICE LINE
    // comes with circles which activate toolTips
    // 
    const dataGrabber = (entry) => entry.close;
    const maxY = d3.max(data, (d) => d.ma[options.analRange] + d.stdev[options.analRange] * 2)
    const minY = d3.min(data, (d) => {
        const low = d.ma[options.analRange] - d.stdev[options.analRange] * 2;
        return low >= 0 ? low : 0
    })
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([minY, maxY]);
    return (
        <g id='priceline graph'>
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
                options={options}
            />
            <MABollinger
                height={height}
                width={width}
                xDate={xDate}
                y={y}
                dataGrabber={dataGrabber}
                options={options}
                position={position}
                data={data}
            />
            <Yaxis
                name={'priceLineYaxis'}
                y={y}
                position={[position[0]+width,position[1]]}
                label={"$"}
            />
            <Circles
                name={'priceDot'}
                dataGrabber={dataGrabber}
                x={xDate}
                y={y}
                data={data}
                position={position}
                options={options}
    />
        </g>
    )
}