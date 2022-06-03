function chart(elemId){
  d3.csv("https://raw.githubusercontent.com/liliwang97/liliwang97.github.io/main/df_actor_simple.csv", function(data) {

    // sort data
    if(elemId==0){
        data.sort(function(b, a) {
            return a.avg_global_profit - b.avg_global_profit;
        });
    }
    else{
        data.sort(function(b, a) {
            return a.avg_usa_profit - b.avg_usa_profit;
        });
    }
    
    console.log(data);
    var barwidth_value = 4;

    // var bars_on = [3, 4, 5]

    // var select = d3.select('#plot')
    //     .append('select')
    //         .attr('class','select')
    //     .on('change',onchange)

    // var options = select
    //     .selectAll('option')
    //     .data(bars_on).enter()
    //     .append('option')
    //         .text(function (d) { return d; });

    // function onchange() {
    //     selectValue = d3.select('select').property('value')
    //     //console.log(selectValue)
    //     barwidth_value = selectValue;
    // };


    const margin =  {top: 50, right: 10, bottom: 20, left: 120};
    const marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
    const selectorHeight = 8/58*$('#plot').height() - marginOverview.top - marginOverview.bottom;
    const width = $('#plot').width() - margin.left - margin.right;
    const height = 50/58*$('#plot').height() - margin.top - margin.bottom - selectorHeight;
    const heightOverview = 8/58*$('#plot').height() - marginOverview.top - marginOverview.bottom;

    const colorbar = ["#D9ED92","#B5E48C","#99D98C","#76C893","#52B69A","#34A0A4","#168AAD","#1A759F","#1E6091","#184E77"]

    var maxLength = d3.max(data.map(function(d){ return d.actor.length}))
    var barWidth = maxLength * barwidth_value;
    var numBars = Math.round(width/barWidth);

    // define x axis
    var xscale = d3.scale.ordinal()
        .domain(data.slice(0,numBars).map(function (d) { return d.actor; }))
        .rangeBands([0, width], .2);
    
    var xAxis  = d3.svg.axis()
        .scale(xscale)
        .orient("bottom");

    // define y axis
    if(elemId==0){
        var yscale = d3.scale.linear()
                            //	.domain([0, d3.max(data, function (d) { return d.avg_global_profit; })])
                .domain([0, 1200000000])
                .range([height, 0]);
    }
    else{
        var yscale = d3.scale.linear()
                            //	.domain([0, d3.max(data, function (d) { return d.avg_global_profit; })])
                .domain([-80000000, 300000000])
                .range([height, 0]);
    }

    var yAxis  = d3.svg.axis().scale(yscale).orient("left");

    // create new svg 
    var svg = d3.select("#plot").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom + marginOverview.top+marginOverview.bottom+selectorHeight);

    // create chart container on svg
    var diagram = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // draw bars
    var bars = diagram.append("g");
    if(elemId==0){
        bars.selectAll("rect")
                .data(data.slice(0, numBars), function (d) {return d.actor; })
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return xscale(d.actor); })
                .attr("y", function (d) { return yscale(d.avg_global_profit); })
                .attr("width", xscale.rangeBand())
                .attr("height", function (d) { return height - yscale(d.avg_global_profit); })
                .attr("fill", function (d,i) {
                    const rem = i%20;
                    if(rem<=9) return colorbar[9-rem];
                    else return colorbar[rem-10];
                })
                .on("mouseenter", mouseover)
                .on('mouseleave', mouseleave);
    }
    else{
        bars.selectAll("rect")
                .data(data.slice(0, numBars), function (d) {return d.actor; })
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return xscale(d.actor); })
                .attr("y", function (d) { return yscale(d.avg_usa_profit); })
                .attr("width", xscale.rangeBand())
                .attr("height", function (d) { return height - yscale(d.avg_usa_profit); })
                .attr("fill", function (d,i) {
                    return colorbar[9-i%10];
                })
                .on("mouseover", mouseover)
                .on('mouseleave', mouseleave);
    }

    // draw x axis
    diagram.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(0, " + height + ")");
        

    // draw y axis
    diagram.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .call(g => g.append("text")
            .attr("x", 5)
            .attr("y", 0)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .style("font-family", "'Times New Roman', Times, serif")
            .text("Average Profit(USD)"));
        
    // add title to the diagram
    const title = diagram.append("text")
        .attr("x", (width/2))
        .attr("y", 0)
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

    // For Overview box
    // Define overeview x axis
    var xOverview = d3.scale.ordinal()
                    .domain(data.map(function (d) { return d.actor; }))
                    .rangeBands([0, width], .2);

    // Define overeview y axis
    yOverview = d3.scale.linear().range([heightOverview, 0]);
    yOverview.domain(yscale.domain());

    // Draw subbars
    var subBars = diagram.selectAll('.subBar')
        .data(data)
    if(elemId==0){
        subBars.enter().append("rect")
            .classed('subBar', true)
            .attr({
                height: function(d) {
                    return heightOverview - yOverview(d.avg_global_profit);
                },
                width: function(d) {
                    return xOverview.rangeBand()
                },
                x: function(d) {

                    return xOverview(d.actor);
                },
                y: function(d) {
                    return height + marginOverview.top +yOverview(d.avg_global_profit)
                }
            })
    }
    else{
        subBars.enter().append("rect")
            .classed('subBar', true)
            .attr({
                height: function(d) {
                    // console.log("heightOverview", heightOverview);
                    // console.log("yOverview(d.avg_usa_profit)", yOverview(d.avg_usa_profit));
                    return heightOverview - yOverview(d.avg_usa_profit);
                },
                width: function(d) {
                    return xOverview.rangeBand()
                },
                x: function(d) {

                    return xOverview(d.actor);
                },
                y: function(d) {
                    return height + marginOverview.top + yOverview(d.avg_usa_profit)
                }
            })
    }

    // append mover in the overview charts
    diagram.append("rect")
              .attr("class", "mover")
              .attr("x", 0)
              .attr("y", height + marginOverview.top)
              .attr("height", selectorHeight)
              .attr("width", Math.round(parseFloat(numBars * width)/data.length))
              .attr("pointer-events", "all")
              .attr("cursor", "ew-resize")
              .call(d3.behavior.drag().on("drag", display));

    // console.log(width);
    
    displayed = d3.scale.quantize()
              .domain([0, width])
              .range(d3.range(data.length));

    function display () {
        // console.log(d3.event)
        var x = parseInt(d3.select(this).attr("x")),
            nx = x + d3.event.dx,
            w = parseInt(d3.select(this).attr("width")),
            f, nf, new_data, rects;

        if ( nx < 0 || nx + w > width ) return;

        d3.select(this).attr("x", nx);

        f = displayed(x);
        nf = displayed(nx);

        if ( f === nf ) return;

        new_data = data.slice(nf, nf + numBars);

        xscale.domain(new_data.map(function (d) { return d.actor; }));
        diagram.select(".x.axis").call(xAxis);

        rects = bars.selectAll("rect")
            .data(new_data, function (d) {return d.actor; });

        rects.attr("x", function (d) { return xscale(d.actor); });

    // 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

        if(elemId==0){
            rects.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xscale(d.actor); })
            .attr("y", function (d) { return yscale(d.avg_global_profit); })
            .attr("width", xscale.rangeBand())
            .attr("height", function (d) { return height - yscale(d.avg_global_profit); })
            .attr("fill", function (d,i) {
                return colorbar[9-i%10];
            })
        //  .on('mouseenter', mouseenter)
            .on("mouseover", mouseover)
            .on('mouseleave', mouseleave);
        }
        else{
            rects.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xscale(d.actor); })
            .attr("y", function (d) { return yscale(d.avg_usa_profit); })
            .attr("width", xscale.rangeBand())
            .attr("height", function (d) { return height - yscale(d.avg_usa_profit); })
            .attr("fill", function (d,i) {
                return colorbar[9-i%10];
            })
        //  .on('mouseenter', mouseenter)
            .on("mouseover", mouseover)
            .on('mouseleave', mouseleave);
        }
        rects.exit().remove();
    }

    // Add tip box
    // var Tooltip = d3.select("#actor_data")
    var tooltip = d3.select("#tooltip")
        .style("opacity", 0);
    

    function mouseover(d) {
        var myImageURL = d.actor_image;

        tooltip.transition().duration(300).style("opacity", 1);
        
        tooltip.select("#mtitle1").text(d.actor);
        tooltip.select("#img1")
            .attr("src", myImageURL);

        tooltip.style('z-index', 1000);
        tooltip.style("transform", `translate(`
                + `calc(${d3.event.clientX}px),`
                + `calc(${height/4}px)`
                + `)`);
        
        d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 0.6)
            .attr('x', (a) => xscale(a.actor) - 5)
            .attr('width', barWidth + 1)
    }

    function mouseleave() {
        tooltip.style("opacity", 0);
        tooltip.style("z-index", -1);
        //sd3.select(this).attr('opacity', 1)
        d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 1)
            .attr("x", function (d) { return xscale(d.actor); })
            .attr("width", xscale.rangeBand());
    }
})
}