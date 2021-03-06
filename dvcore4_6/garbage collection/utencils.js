function draw_scatter_point(value, index, array){
    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data([value[0],value[1]])
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.GrLivArea); } )
        .attr("cy", function (d) { return y(d.SalePrice); } )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
}


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
let x = d3.scaleTime()
  .range([0, width])
  .domain([list_dir[0][1].getFullYear(), list_dir[list_dir.length-1][1]].getFullYear())
let xAxis = (g, x) => g
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisTop(x).ticks(12))
  .call(g => g.select(".domain").attr("display", "none"))
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
let y = d3.scaleLinear()
  .domain([-110766322.0, 2553439092.0])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

let yAxis = (g, y) => g
  .call(d3.axisRight(y).ticks(12 * k))
  .call(g => g.select(".domain").attr("display", "none"))
list_dir.forEach(create_scatter_point);
