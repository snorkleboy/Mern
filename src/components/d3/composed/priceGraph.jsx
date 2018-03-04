
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
    const maxY = d3.max(data, (d)=>d.ma + d.stdev * 2 )
    const minY = d3.min(data, (d) => { let low = d.ma - d.stdev * 2;low = d.ma < low ? d.ma : low ;return low >=0 ? low : 0}  )
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