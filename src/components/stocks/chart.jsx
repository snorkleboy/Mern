
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeParse } from "d3-time-format";
import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";

class AreaChartWithYPercent extends React.Component {
    constructor(props){
        super(props);
        console.log('chart con',props);
    }

    render() {
        const { data, type, width, ratio } = this.props;
        return (
            <ChartCanvas ratio={ratio} width={width} height={400}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                seriesName="MSFT"
                data={data} type={type}
                xAccessor={d =>  new Date(d.date)}
                xScale={scaleTime()}
                >
                <Chart id={0} yExtents={d => d.close}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                    <YAxis axisAt="left" orient="left" />
                    <YAxis axisAt="right" orient="right" percentScale={true} tickFormat={format(".0%")} />
                    <AreaSeries yAccessor={d => d.close} />
                </Chart>
            </ChartCanvas>
        );
    }
}

AreaChartWithYPercent.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChartWithYPercent.defaultProps = {
    type: "svg",
};
AreaChartWithYPercent = fitWidth(AreaChartWithYPercent);


export default AreaChartWithYPercent;
