  function chart(){
  // set the dimensions and margins of the graph
  const margin = ({top: 30, right: 40, bottom: 60, left: 40});

  const width = $('#plot').width() - margin.left - margin.right;
  const height = $('#plot').height() - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/datavis-project-2022-bcd/main/data/df_genre_new.csv", function(data) {
    var genres = [];
    for (var i = 0; i < data.length; i++) {
        genres.push(data[i].genre);
    }

    //console.log(genres)

    // Color scale: give me a specie name, I return a color
    color = d3.scaleOrdinal()
      .domain(genres)
      .range(["#BEDB39","#8BC34A","#43A047","#289976","#287D7D",
              "#A8C545","#588F27","#66BB6A","#1F8A70","#BDD684",
              "#689F38","#2E7D32","#1BBC9B","#95AB63","#45BF55",
              "#00A388","#A9CF54","#BEEB9F","#79BD8F","#00796B"])

    /*var color = d3.scaleLinear()
      .domain(genres)
      .range(["#440154ff", "#21908dff"])
      .interpolate(d3.interpolateLab);
    */

    // Extract the list of dimensions
    dimensions = d3.keys(data[0])
  //  dimensions = [1,4,6,8,10,12].map(x=>dimensions[x]);
    dimensions = [5,6,7,8,9,10,11,12].map(x=>dimensions[x]);

    console.log(dimensions);
    // build linear scale for each dimension
    // except the first, it's ordinal scale
    // store all in a y object
    var y = {}
    for (i in dimensions) {
      name = dimensions[i]
      if (false){}
    /*  if (name === "genre"){
        y[name] = d3.scaleOrdinal()
          .domain( d3.extent(data, function(d) { return d[name]; }) )
          .range([height, 450, 425, 400, 375, 350, 325, 300, 275, 250, 225, 200, 175, 150, 125, 100, 75, 50, 25, 0])
      }*/
      else{
        y[name] = d3.scaleLinear()
          .domain( d3.extent(data, function(d) { return +d[name]; }) )
          .range([height, 0])
      }

    }

    // build the X scale
    // find the best position for each Y axis
    x = d3.scalePoint()
      .range([0, width])
      .padding(1)
      .domain(dimensions);

    // Add tip box
    var tooltip = d3.select("#tooltip")

    // Highlight the specie that is hovered
    highlight = function(d){
      //var myImageURL = d.actor_image;
      //var imageEls = "<img src=" + myImageURL +
      //    " style='width:300px; height:400px; opacity:1; margin: auto;' />";

      var selected_genre = d.genre;
      var film_name = d.best_film;
      var myImageURL = d.poster;

        tooltip
            .transition().duration(300).style("opacity", 1);

        tooltip.select("#title")
            .text(["Movie in Genre",selected_genre].join(" "));
        tooltip.select("#mtitle1")
            .text(film_name);
        tooltip.select("#img1")
            .attr("src", myImageURL);

      tooltip
        .style("transform", `translate(${d3.event.clientX}px,${d3.event.clientY}px)`);
      tooltip
        .style('z-index', 1000);

      // first every group turns grey
      d3.selectAll(".line")
        .transition().duration(200)
        .style("stroke", "lightgrey")
        .style("opacity", "0.2");

      // Second the hovered specie takes its color
      d3.selectAll("." + selected_genre)
        .transition().duration(200)
        .attr("stroke-width", 6)
        .style("stroke", color(selected_genre))
        .style("opacity", "1");
    }

    // Unhighlight
    doNotHighlight = function(d){
      tooltip
        .style("opacity", 0)
        .style("z-index", -1);
      d3.selectAll(".line")
        .transition().duration(200).delay(1000)
        .style("stroke", function(d){ return( color(d.genre))} )
        .style("opacity", "1");
    }

    // input: a row of the csv
    // return: x and y coordinates of the line to draw
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }


    // Draw the lines
    svg
      .selectAll("myPath")
      .data(data)
      .enter()
      .append("path")
      .attr("class", function (d) { return "line " + d.genre } )
      .attr("d",  path)
      .style("fill", "none")
      .attr("stroke-width", 3)
      .style("stroke", function(d){ return( color(d.genre))} )
      .style("opacity", 0.5)
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight )

    // Draw the axis
    svg.selectAll("myAxis")
      // Add "g" for each dimension
      .data(dimensions).enter()
      .append("g")
        .style("fill", "MidnightBlue")
      // translate this element to its right position on the x axis
      .attr("transform", function(d) { return `translate(${x(d)})`; })
      // build the axis with the call function
      .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
      // add axis title
      .append("text")
        .style("text-anchor", "middle")
        .attr("y", 700/900*$('#plot').height())
        .attr("x", -150/600*$('#plot').width())
        .text(function(d) { return d; })
        .style("fill", "MidnightBlue")
        .attr("transform", "translate(-10,0)rotate(-30)")
        .style("font-size", "12px")
        .style("font-weight", "bold")

  })
}
