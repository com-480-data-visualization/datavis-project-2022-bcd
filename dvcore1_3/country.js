function chart(elemId){
    const margin = ({top: 30, right: 40, bottom: 30, left: 40});

    const width = $('#plot').width() - margin.left - margin.right;
    const height = $('#plot').height() - margin.top - margin.bottom;
    console.log("width ", width);
    console.log("height ", height);

    // append the svg object to the body of the page
    const svg = d3.select("#plot")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
    // Map and projection
    var path = d3.geoPath();
    var projection = d3.geoMercator()
        .scale(Math.min(height/5,width/8))
        .center([0,20])
        .translate([width / 2, height / 2]);
    // Data and color scale
    const data = d3.map();
    const profit_data =[];

    // Load external data and boot
    if(elemId==0){
        console.log("loading avg global profit data");
        d3.queue()
            .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .defer(d3.csv, "https://raw.githubusercontent.com/liliwang97/liliwang97.github.io/main/df_country_code.csv", function(d) {
                data.set(d.code,[d.avg_global_profit, d.country,d.poster]);
                profit_data.push(parseInt(d.avg_global_profit));
            } )
            //.defer(d3.csv, "https://raw.githubusercontent.com/liliwang97/liliwang97.github.io/main/df_country_code.csv")
            .await(ready);
    }
    else{
        console.log("loading avg usa profit data");
        d3.queue()
            .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .defer(d3.csv, "https://raw.githubusercontent.com/liliwang97/liliwang97.github.io/main/df_country_code.csv", function(d) {
                data.set(d.code,[d.avg_global_profit, d.country,d.poster]);
                profit_data.push(parseInt(d.avg_global_profit));
            } )
            //.defer(d3.csv, "https://raw.githubusercontent.com/liliwang97/liliwang97.github.io/main/df_country_code.csv")
            .await(ready);
    }
    
    //.await(function(error, file1, file2) {
    //if (error) {
    //    console.error('Oh dear, something went wrong: ' + error);
    //}
    //else {

    // Add tip box
    console.log("data", data);
    console.log("profit: ", profit_data);
    colorScale = d3.scaleLinear()
        .domain(d3.extent(profit_data));
    const Tooltip = d3.select("#tooltip_country").style("opacity", 0);
    const title = svg.append("text")
        .attr("x", (width/2))
        .attr("y", (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")
        .style("font-weight", 700) 
        .style("font-family", "'Times New Roman', Times, serif");

    if(elemId == 0){
        title.text("Worldwide");
    }
    else{
        title.text("USA");
    }

    function ready(error, topo) {
        mouseover = function(d) {
            console.log(d)
            var selected_country = d.country;
            console.log(selected_country)

            Tooltip
            .style("opacity", 1)
            .html(selected_country)
            .style("z-index","100")

            Tooltip
            .style("transform", `translate(`
                    + `calc(${width-2*margin.left}px),`
                    + `calc(${height/2.25}px)`
                    + `)`);

            d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", 0.5)
            d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "black")
        };

        mouseleave = function(d) {
            Tooltip
            .style("opacity", 0)
            d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .8)
            d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "transparent")
        };

        // Draw the map
        svg.append("g")
            .attr("transform",
            "translate(0," + margin.top + ")")
            .selectAll("path")
                .data(topo.features.filter(d => d.id !== "GRL" && d.id !== "ATA"))
                //.data(topo.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    datum = data.get(d.id) || 0;
                    console.log("datum d[0]: ", datum);
                    console.log("scaled: ", colorScale(datum[0]));
                    return d3.interpolateGnBu(colorScale(datum[0]));
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                .on("mouseenter", mouseover )
                .on("mouseleave", mouseleave );
    }
}