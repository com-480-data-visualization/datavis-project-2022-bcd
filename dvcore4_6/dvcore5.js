chart = function(svg_element_id, data){
    //define outer shape
    margin = ({top: 30, right: 20, bottom: 35, left: 30});
    var width =  $('#plot').width()-margin.left-margin.right;
    var height = $('#plot').height()-margin.top-margin.bottom; 

    const svg = d3.select('#plot')
        .append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    //add x axis
    x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);

    //add y axis
    y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value)).nice()
        .range([height - margin.bottom, margin.top]);

    //map directors with their own colors
    let directors = d3.map(data, elem=>elem.name);
    directors = [... new Set(directors)];
    // console.log(directors);
    const dir_color = d3.map(directors, (elem, index)=>d3.interpolateSpectral(index/directors.length));
    function point_color(director){
        return dir_color[directors.indexOf(director)];
    }

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
        // .call(g => g.select(".domain").remove());


    if(svg_element_id==0){
        yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "+"))
        // .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
        .filter(d => d === 0.2)
        .style("stroke-dasharray", ("3, 3"))
        .clone()
            .attr("x2", width - margin.right - margin.left)
            .attr("stroke", "#000000"))
            .attr("stroke-opacity", 0.5)
        .call(g => g.append("text")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .style("font-family", "'Times New Roman', Times, serif")
            .text("Net Profit(*10^9 USD)"));
    }
    else{
        yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "+"))
        // .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
        .filter(d => d === 0.1)
        .style("stroke-dasharray", ("3, 3"))
        .clone()
            .attr("x2", width - margin.right - margin.left)
            .attr("stroke", "#000000"))
            .attr("stroke-opacity", 0.5)
        .call(g => g.append("text")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .style("font-family", "'Times New Roman', Times, serif")
            .text("Net Profit(*10^9 USD)"));
    }
    


    const clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", margin.left)
            .attr("y", margin.right);

    const scatter = svg.append('g')
        .attr("clip-path", "url(#clip)");

    //Add the brushing
    const brush = d3.brushX() 
        .extent([[0,0], [width-margin.left-margin.right,height-margin.top-margin.bottom]])
        .on("end", brushed);
    
    scatter.append("g")
        .attr("class", "brush")
        .call(brush)
        .on('dblclick', toDefault);

    // add circles
    const dots = scatter.selectAll("circle")
        .data(data)
        .enter()  
        .append("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.value))
            .attr("fill", d => point_color(d.name))
            .attr("opacity", 0)
            .attr("r", 5)
            .style("cursor", "pointer");

    const minYear = 2000
    dots.transition()
        .duration(2000)
        .attr("opacity", 0.5);

    dots.on("click", mouseEnter);
    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis);

    svg.selectAll(".x-axis")
        .selectAll('text')
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)");

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    let title = svg.append("text")
        .attr("x", (width/2))
        .attr("y", (margin.top/1.5))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")
        .style("font-weight", "bold") 
        .style("font-family", "'Times New Roman', Times, serif")
        .style("color", '#000');

    if(svg_element_id == 0){
        console.log("appending title");
        title.text("Worldwide");
    }
    else{
        title.text("USA");
    }

    svg.selectAll(".domain")
        .style("display", "none");
    
    function brushed({selection}) {
        // if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        if (selection) {
            const [x0, x1] = selection;
            const k = width/Math.abs(x0-x1);
            svg.select(".brush").call(brush.clear);
            x.domain([ x.invert(x0), x.invert(x1) ]);
            const dot = svg.select("circle")
            svg.selectAll(".x-axis").transition().duration(2000).call(xAxis);
            svg.selectAll(".x-axis")
                .selectAll('text')
                .style("text-anchor", "end")
                .attr("transform", "rotate(-65)");
            // y.domain([y.invert(y0),y.invert(y1)]);
            scatter
                .selectAll("circle")
                .transition().duration(2000)
                .attr("cx", d => x(d.date))
                // .attr("r", 2.5*Math.log(k)/Math.log(1.1));
            // svg.call(xAxis);
            // svg.call(yAxis);
        }
    }

    function toDefault(){
        x.domain(d3.extent(data, d => d.date));
        svg.selectAll(".x-axis").transition().duration(2000).call(xAxis);
            svg.selectAll(".x-axis")
                .selectAll('text')
                .style("text-anchor", "end")
                .attr("transform", "rotate(-65)");
            // y.domain([y.invert(y0),y.invert(y1)]);
            scatter
                .selectAll("circle")
                .transition().duration(2000)
                .attr("cx", d => x(d.date))
                // .attr("r", 2.5);
    }
    const tooltip = d3.select("#tooltip").style("opacity", 0);
    tooltip.select("#close")
        .on("click", mouseLeave);
    let sum = 0;
    data.forEach(d=>sum = sum+d.value);
    const profit_mean = sum/data.length;
    console.log(profit_mean);

    function mouseEnter(datum){
        console.log(datum);
        var i = datum.path[0].__data__;
        console.log(i);
        dots.transition()
            .duration(1000)
            .attr("fill", "gray")
            .attr("opacity", 0.2);
        dots.filter(d => d.name == i.name)
            .transition()
            .duration(1000)
                .attr("fill", d => point_color(d.name))
                .attr("opacity", 1);
        // let path = scatter.append('path')
        //         .data(data)
        //         .filter(d => d.name == i.name)
        //         .enter()
        //         .join('path')
        //             .attr('fill', 'none')
        //             .attr('stroke', point_color(i.name))
        //             .attr("stroke-width", 1.5)
        //             .attr("d", d3.line()
        //                 .x(d=>x(+d.date))
        //                 .y(d=>y(+d.value))
        //             );

        tooltip.transition().duration(2000).style("opacity", 1).style("z-index", 1000);
        tooltip.select("#mtitle1")
            .text(i.name);
        tooltip.select("#mtitle2")
            .text(i.movie);
        if(i.dirImg!='nan'){
            tooltip.select("#img1")
            .attr("src", i.dirImg);
        }
        else{
            tooltip.select("#img1")
            .attr("src", "./noImage.jpeg");
        }
          
        if(i.movieImg!='nan'){
            // console.log(data[i].poster2)
            tooltip.select("#img2")
            .attr("src", i.movieImg);
        }
        else{
            tooltip.select("#img2")
            .attr("src", "./noImage.jpeg");
        }

        // const x_dis = x(i.date)+ margin.left;
        console.log("width tooltip: ", tooltip.attr("width"));
        // tooltip.style("transform", `translate(`
        //     + `calc(${width-margin.right}px - 15vw),`
        //     + `calc(${height/2.25}px)`
        //     + `)`);

        tooltip.style("transform", `translate(` + `min(${margin.left+x(i.date)}px,` + `calc(${width-margin.right}px - 15vw)`+ `),50px)`);
        tooltip.style('z-index', 1000);
        // const y_dis = y(i.value)+margin.top;
        // if(x_dis<width/2){
            
        // }
        // else{
        //     tooltip.style("transform", `translate(`
        //     + `calc(-50% + ${x_dis}px),`
        //     + `${height/2}px`
        //     + `)`);
        // }
    }
    function mouseLeave(){
        console.log("mouse leave")
        dots.transition()
            .duration(1000)
            .attr("fill", d => point_color(d.name))
            .attr("opacity", 0.5);

        tooltip.transition().duration(1000).style("opacity", 0);
        tooltip.style('z-index', -1);
    }

    return svg.node();
};
console.log("had run all codes here");