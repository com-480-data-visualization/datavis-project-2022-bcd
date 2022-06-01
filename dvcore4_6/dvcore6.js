function GroupedBarChart(data, elemId, {
  x, // given d in data, returns the (ordinal) x-value
  y, // given d in data, returns the (quantitative) y-value
  z, // given d in data, returns the (categorical) z-value 
  xPadding = 0.2, // amount of x-range to reserve to separate groups
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  zDomain, // array of z-values
  zPadding = 0, // amount of x-range to reserve to separate bars
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  margin = ({top: 30, right: 40, bottom: 30, left: 40});
  var width = $('#quarter').width()-margin.left-margin.right;
  var height = $('#quarter').height()-margin.top-margin.bottom; 
  console.log(width);
  console.log(height);

  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  const svg = d3.select('#quarter')
    .append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.top+margin.bottom)
    .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");        
  // Compute default domains, and unique the x- and z-domains.
  yDomain = [d3.min(Y)-0.25, d3.max(Y)];
  xDomain = new d3.InternSet(X);

  xRange = [margin.left, width - margin.right];
  yRange = [height - margin.bottom, margin.top]; // [ymin, ymax]

  // Omit any data not present in both the x- and z-domain.
  const I = d3.range(X.length)

  // Construct scales, axes, and formats.
  xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  xzScale = d3.scaleBand(zDomain, [0, xScale.bandwidth()]).padding(zPadding);
  const yScale = yType(yDomain, yRange);
  const zScale = d3.scaleOrdinal(zDomain, colors);


  xAxis = g => g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(xScale).tickSizeOuter(0));
  yAxis = g => g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yScale).ticks(height / 60, yFormat))
          .call(g => g.append("text")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .text("Net Profit(USD)"))
          .call(g => g.selectAll(".tick line")
            .filter(d => d === 0)
            .style("stroke-dasharray", ("3, 3"))
            .clone()
                .attr("x2", width - margin.right - margin.left)
                .attr("stroke", "#000000"))
                .attr("stroke-opacity", 0.5);
                
      
  console.log("Z[0]", Z[0]);            
  console.log("zScale", zScale(Z[0]));
  console.log("xScale", xScale(X[0]));


  let title = svg.append("text")
    .attr("x", (width/2))
    .attr("y", (margin.top/2))
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .style("font-weight", 700) 
    .style("font-family", "sans-serif");

  if(elemId == 0){
    title.text("Worldwide");
  }
  else{
      title.text("USA");
  }

  const clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", margin.left)
            .attr("y", margin.right);
  
  const plot = svg.append('g')
    .attr("clip-path", "url(#clip)");
  
  plot.append('g')
    .call(zoom);


  let bar = plot.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("x", i => 10 + xScale(X[i]) + xzScale(Z[i]))
      .attr("y", height - margin.bottom)
      .attr("width", xzScale.bandwidth())
      .attr("height", 0.01)
      .attr("fill", i => zScale(Z[i]));

  console.log("bar",bar);

  bar.transition()
    .duration(1000)
    .attr("y", i => yScale(Y[i]))
    .attr("height", i => yScale(d3.min(Y)-0.25) - yScale(Y[i]))
    .delay(function(i){return(i*10)});
    
  bar.on("click", onMouseEnter);

  svg.append("g")
  .call(yAxis);

  svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);


  const tooltip = d3.select("#tooltip").style("opacity", 0);
  tooltip.select("#close")
    .on("click", onMouseLeave);

  function onMouseEnter(datum) {

    var i = datum.path[0].__data__;
    tooltip.transition().duration(1000).style("opacity", 1);
    tooltip.select("#title")
      .text(["Quarter",Z[i],",",X[i]].join(" "));
    tooltip.select("#mtitle1")
      .text(data[i].movie1);
    tooltip.select("#mtitle2")
      .text(data[i].movie2);

    if(data[i].poster1!='nan'){
      tooltip.select("#img1")
      .attr("src", data[i].poster1)
      .attr("width", '100%')
      .attr("height", "200px");
    }
    else{
      tooltip.select("#img1")
      .attr("src", "./noImage.jpeg")
      .attr("width", '100%')
      .attr("height", "200px");
    }

    if(data[i].poster2!='nan'){
      // console.log(data[i].poster2)
      tooltip.select("#img2")
      .attr("src", data[i].poster2)
      .attr("width", '100%')
      .attr("height", "200px");
    }
    else{
      tooltip.select("#img2")
      .attr("src", "./noImage.jpeg")
      .attr("width", '100%')
      .attr("height", "200px");
    }

    const x = (10 + xScale(X[i]) + xzScale(Z[i])
       + xzScale.bandwidth() / 2
       + margin.left);
    
    const y = (yScale(d3.min(Y)-0.25) - yScale(Y[i])+margin.top);
    if(x<width/2){
      tooltip.style("transform", `translate(`
     + `calc(10% + ${x}px),`
     + `calc(100% - 0.25*${y}px)`
     + `)`);
    }
    else{
      tooltip.style("transform", `translate(`
     + `calc(-50% + ${x}px),`
     + `calc(100% - 0.25*${y}px)`
     + `)`);
    }
    tooltip.style("z-index", 1000);
  }
  function onMouseLeave() {
    tooltip.transition().duration(200).style("opacity", 0);
    tooltip.style("z-index", -1);
  }
      
  function zoom(plot) {
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

    svg.call(d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed));
      
    function zoomed(event) {
      xScale.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
      xzScale.range([0, xScale.bandwidth()]);
      bar.attr("x", i => 10+ xScale(X[i]) + xzScale(Z[i])).attr("width", xzScale.bandwidth());
      svg.selectAll(".x-axis").call(xAxis);
    }
  }
  return Object.assign(svg.node());
}

