import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const data = this.props.data1;

    if (!data || data.length === 0) {
      return;
    }

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const w = 500 - margin.left - margin.right;
    const h = 300 - margin.top - margin.bottom;

    const svg = d3.select(this.svgRef.current)
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x_scale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total_bill)])
      .range([0, w]);

    const y_scale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.tip)])
      .range([h, 0]);

    // Draw axes
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y_scale));

    // Add axis labels
    g.append("text")
      .attr("class", "x-label")
      .attr("x", w / 2 )
      .attr("y", h+margin.bottom/2 + 10) // This should be enough to position below the axis
      .style("text-anchor", "middle")
      .text("Total Bill");

    g.append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", -h / 2)
      .style("text-anchor", "middle")
      .text("Tip");

    // Title
    svg.append("text")
      .attr("class", "title")
      .attr("x", w / 2 + margin.left)
      .attr("y", margin.top / 2)
      .style("text-anchor", "middle")
      .text("Scatter Plot of Total Bill vs. Tips");

    // Draw scatter points
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x_scale(d.total_bill))
      .attr("cy", d => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  render() {
    return <svg ref={this.svgRef} />;
  }
}

export default Child1;
