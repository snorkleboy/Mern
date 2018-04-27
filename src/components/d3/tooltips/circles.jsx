
import React from "react";
import * as d3 from "d3";

class Circles extends React.Component {
    constructor(props) {
        super(props);
        this.make = this.make.bind(this);
    }
    render(){
        return(

        )
    }
    make(){
        el.selectAll(classname)
            .data(dataa)
        dataObj = chart.selectAll('.dot child').data(data)
        temp = dataObj.enter().append("circle")
            .attr("class", "dot child")
            .attr("cx", ((d, i) => position[0] + x(i)))
            .attr("cy", (d) => position[1] + y(d.close))
            .attr("r", .1)
            .on("mouseover", toolTipper)
            .on("mouseout", deToolTipper)
        // only apply transitions if there isnt too much data
        if (data.length < maxElForTransitions) {
            temp.transition() // apply a transition
                .duration(750)
                .attr("r", 2)
        } else {
            temp.attr("r", 2)
        }
    }
}