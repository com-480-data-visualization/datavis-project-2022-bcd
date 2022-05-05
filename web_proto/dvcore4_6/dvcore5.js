chart = function(svg_element_id){
    const svg = d3.select('#' + svg_element_id)
        .attr("viewBox", [0, 0, width, height]);
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    svg.append("g")
        .attr("stroke", "#ccc")
        .attr("stroke-opacity", 0.05)
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("fill", d => z(d.value))
        .attr("r", 2.5)
        .classed('posi', d => d.value >= 0) // color classes
	    .classed('nega', d => d.value < 0);
  
    return svg.node();
};

const data_raw = list_dir;
const data = [];
// console.log('log in jscode, data_raw', data_raw);
data_raw.forEach(elem => {
    data.push({
        date: elem[0], 
        value: (Math.log(Math.abs(elem[1]))/Math.log(10))*Math.sign(elem[1]), 
        name: elem[2]
    });
});

console.log('log in jscode', data[0]);
width = 400;
height = 200;
margin = ({top: 20, right: 30, bottom: 30, left: 40});

x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value)).nice()
    .range([height - margin.bottom, margin.top]);

z = function(){
    const max = d3.max(data, d => Math.abs(d.value));
    return d3.scaleSequential(d3.interpolateRdBu).domain([max, -max]); 
};

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80))
    .call(g => g.select(".domain").remove());

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "+"))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line")
      .filter(d => d === 0)
      .clone()
        .attr("x2", width - margin.right - margin.left)
        .attr("stroke", "#ccc"))
    .call(g => g.append("text")
        .attr("fill", "rgb(100, 100, 100)")
        .attr("x", 5)
        .attr("y", margin.top)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start")
        .text("Net Profit(USD)"));


console.log("had run all codes here");