
import React from "react";
import * as d3 from "d3";
import Line from '../line';
import Yaxis from '../yAxis';
import Circles from '../circles';
import MABollinger from './MABollinger';
export default class extends React.Component {

    // PRICE LINE
    // comes with circles which activate toolTips
    // 
    
    render(){
        var { data, height, width, xDate, position, options } = this.props;
        const ranges = Object.keys(data[0].ma);
        const dataGrabber = (entry) => entry.close;
        const maxY = d3.max(data, (d) =>{
            // const posMaxs = ranges.map((range) => d.ma[range] + d.stdev[range] * 2)
            // return minMax(posMaxs, (a, b) => Boolean(a > b))
            return d.close
        })
        const minY = d3.min(data, (d) => {
            // const posMins = ranges.map((range) => d.ma[range] - d.stdev[range] * 2)
            // return minMax(posMins,(a,b)=>Boolean(a<b))
            return d.close
        })
        const padding = (maxY-minY)/10
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([minY - padding, maxY + padding]);    
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
}

function minMax(arr,comp){
    return arr.reduce((acc,curr)=>comp(acc,curr) ? acc : curr);
}