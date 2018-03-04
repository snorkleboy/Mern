g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.letter); })
    .attr("y", function (d) { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.frequency); });