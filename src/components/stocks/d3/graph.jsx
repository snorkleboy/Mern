
import React from "react";
import * as d3 from "d3";
import Line from './line';
import Area from './area';
import Xaxis from './timeAxis'
import Yaxis from './yAxis';
import Circles from './circles';
class Graph extends React.Component {
    constructor(props) {
        super(props);
        // this.make = this.make.bind(this);
        // console.log('chart con',props);
    }

    render() {
        const AXISWIDTH=[25,25]

        const topHeight = this.props.height-AXISWIDTH[0];
        const width = this.props.width-AXISWIDTH[1];
        const xDate = d3.scaleTime()
            .range([width, 0])
            .domain([new Date(this.props.data[this.props.data.length - 1].date), new Date(this.props.data[0].date)]);
        return (
            <g>
                {
                    (function(){
                        const dataGrabber = (entry) => entry.close;
                        const height = topHeight*(4/5);
                        const maxY = d3.max(this.props.data, dataGrabber)
                        const minY = d3.min(this.props.data, dataGrabber)
                        const y = d3.scaleLinear()
                            .range([height, 0])
                            .domain([minY, maxY]);
                        return (
                            <g>
                                <Line
                                    name={'priceLine'}
                                    data={this.props.data}
                                    dataGrabber={dataGrabber}
                                    x={xDate}
                                    y={y}
                                    classname={"line"}
                                    width={width}
                                    height={height}
                                    position={[0, 0]}
                                />
                                <Xaxis
                                    name={'priceLineXAxis'}
                                    x={xDate}
                                    position={[0, topHeight]}
                                />
                                <Yaxis 
                                    name={'priceLineYaxis'}
                                    y={y}
                                    position={[width, 0]}
                                />
                                <Circles
                                    name={'priceDot'}
                                    dataGrabber={dataGrabber}
                                    x={xDate}
                                    y={y}
                                    data={this.props.data}
                                    position={[width, 0]}
                                />
                            </g>
                        )
                    }).bind(this)()
                }
                
                {(function(){
                    const height = topHeight * (1/10)
                    const dataGrabber = (entry) => entry.volume
                    const volmaxY = d3.max(this.props.data, dataGrabber)
                    const volminY = d3.min(this.props.data, dataGrabber)
                    console.log("MAXMIN",volmaxY,volminY)
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
                            position={[0, topHeight*8/10 ]}
                        />

                    </g>
                    )
                }).bind(this)()
                }


                {(function(){
                    const datagrabber = (entry) => entry.rsi;
                    const height = topHeight * (1/10);
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
                                position={[0, topHeight * 9 / 10 ]}
                            />
                            <Yaxis
                                name={'RSIYaxis'}
                                y={y}
                                ticks={2}
                                position={[width, topHeight * 9 / 10]}
                            />
                    </g>
                    )
                }).bind(this)()
                }

            </g>

                
        );
    }

    componentDidMount() {
        // this.make(this.props);
    }
    componentWillReceiveProps(nextprops){
        // this.make(nextprops);
    }
    // shouldComponentUpdate(){
        // console.log("SHOUDL UPDATE FALSE")
        // return false;
    // }

    // make(props) {
    //     const { data, type } = props;
    //     console.log('graph make',data.ticker)
    //     const chart = document.getElementById('chartD3')
    //     chart.innerHTML=''
    //     const chartArea = [props.width, props.height]
    //     setupPriceLineChart(data, chartArea, type)
    // }
}
// function setupPriceLineChart({data, width,height,x,type,optoins}) {
//     console.log(data)
//     const MARGINS = {
//         top: 0,
//         right: 25,
//         bottom: 25,
//         left: 0,
//         hori: () => MARGINS.right + MARGINS.left,
//         vert: () => MARGINS.top + MARGINS.bottom
//     }
//     const formatDate = d3.timeFormat("%Y-%m-%d")
    
//     let chart = d3.select("#chartD3")
//     chart = chart.append("g").attr("transform", "translate(" + MARGINS.left + "," + -MARGINS.bottom + ")")
//     const last = data.length - 1

//     // price line
//     const maxY = d3.max(data, (entry) => entry.close) * 1.1
//     const minY = d3.min(data, (entry) => entry.close) * .95
//     const y = d3.scaleLinear()
//         .range([chartArea[1] - MARGINS.vert(), 0])
//         .domain([minY, maxY]);

//     const priceLine = d3.line()
//         .x((d) => x(new Date(d.date)))
//         .y((d) => y(d.close))

//     chart.append("g")
//         .append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", priceLine)

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



//     // //volume
//     if (type['volume']){
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
//     }

//     // axis'
//     const axis = chart.append("g")
//     // y axis
//     axis.append("g")
//         .attr('class', 'y axis')
//         .attr("transform", "translate(" + (chartArea[0] - MARGINS.right) + "," + 0 + ")")
//         .call(d3.axisRight(y));
//     // x axis
//     const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%y-%m-%d"));
//     axis.append("g")
//         .attr("transform", "translate(0," + ((chartArea[1])- MARGINS.bottom)+ ")")
//         .attr('class', 'x axis')
//         .call(xAxis)
    

//     // price line dots?
//     chart.append("g").selectAll(".dot")
//         .data(data)
//         .enter().append("circle") // Uses the enter().append() method
//         .attr("class", "dot") // Assign a class for styling
//         .attr("cx", ((d) => x(new Date(d.date))))
//         .attr("cy", (d) => y(d.close))
//         .attr("r", 1);


//     // rsi
//     const yrsi = d3.scaleLinear()
//         .range([0, (chartArea[1]) / 5])
//         .domain([110,-10]);
//     const rsiline = d3.line()
//         .x((d) => x(new Date(d.date)))
//         .y((d) => yrsi(d.rsi))

//     const rsiArea = chart.append("g").attr("transform", "translate(" + 0 + "," + (chartArea[1] / 5 - MARGINS.bottom) + ")")
//     rsiArea.append('svg')
//         .attr('width', chartArea[0] - MARGINS.hori())
//         .attr("height", (chartArea[1]) / 5)
//         .append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", rsiline)
//     // y axis
//     rsiArea.append("g")
//         .attr('class', 'y axis')
//         .attr("transform", "translate(" + (20) + "," + 0 + ")")
//         .call(d3.axisLeft(yrsi));

// }

export default Graph;
