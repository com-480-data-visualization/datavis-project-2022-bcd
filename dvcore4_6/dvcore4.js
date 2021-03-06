stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));
function myWordCloud(myWords, elemId){
    word = d=>d; 
    maxWords = 500;
    console.log("myWords: ", myWords);
    let data = myWords;
    data = data.filter(w => !stopwords.has(w[0]))
        .slice(0, maxWords)
        .map(([string, size, movie, img]) => ({text: word(string), size}));
    console.log(data);
    dataLink = data_trans(myWords);
    console.log("dataLink", dataLink);
    // set the dimensions and margins of the graph
    margin = ({top: 60, right: 40, bottom: 20, left: 40});
    var width = $('#wordCloud').width()-margin.left-margin.right;
    var height = $('#wordCloud').height()-margin.top-margin.bottom; 

    // append the svg object to the body of the page
    var svg = d3.select("#wordCloud").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("viewBox", [0,0,$('#wordCloud').width(),$('#wordCloud').height()])
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");
    let g = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    let title = svg.append("text")
        .attr("x", (width+margin.left)/2)
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

    fontScale = 15;
    w_range = d3.scaleLinear()
        .domain([15,67])
        .range([0,1]);
    console.log("extent: ", d3.extent(data, d=>d.size));
    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    const cloud = d3.layout.cloud()
      .size([width, height])
      .words(data)
      .padding(5)
      .rotate(d=>Math.random()*90)
      .font("sans-serif")
      .fontSize(d => Math.sqrt(d.size) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        // console.log("size", size, "range size: ", w_range(size));
        const words = g.append("text")
            .datum({size, x, y, rotate, text})
            .attr("font-size", size)
            .attr("fill", d3.interpolateCividis(1-w_range(size)/2-0.5))
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text)
            .style("opacity", 0);
        
        words.transition()
            .duration(3000)
            .style("opacity", 1);
      });

    cloud.start();
    const texts = g.selectAll("text");

    texts.style("cursor", "pointer")
                .on("mouseenter", mouseEnter)
                .on("mouseleave", mouseLeave);

    const tooltip = d3.select("#tooltip").style("opacity", 0);
    // tooltip.select("#close").on("click", mouseLeave);
    
    function mouseEnter(event){
        console.log(event);
        let click_word = event.path[0].__data__.text;
        if(dataLink.has(click_word)){
            datum = dataLink.get(click_word);

            tooltip.style("transform", `translate(${event.clientX}px, min(${event.clientY}px, ${height-margin.bottom*2-margin.top}px)`);
            tooltip.transition().duration(300).style("opacity", 1);
            tooltip.select("#mtitle1").text(datum[1]);
            tooltip.select("#img1")
                .attr("src", datum[2]);

            tooltip.style('z-index', 1000);

            d3.select(this).transition()
                .duration(300)
                .attr("fill", d3.interpolateCividis(1));
        }

    }

    function mouseLeave(event){
        let click_word = event.path[0].__data__.text;
        console.log(click_word);
        if(dataLink.has(click_word)){
            datum = dataLink.get(click_word);
            tooltip.transition().duration(1000).style("opacity", 0);
            tooltip.style('z-index', -1);

            d3.select(this).transition()
                .duration(300)
                .attr("fill", d3.interpolateCividis(1-w_range(Math.sqrt(datum[0]) * fontScale)/2-0.5));
        }
    }

    function data_trans(dataset){
        const data_raw = dataset;
        let data_mapped = new Map();
        // console.log('log in jscode, data_raw', data_raw);
        data_raw.forEach(elem => {
            data_mapped.set(elem[0], [elem[1],elem[2], elem[3]]);
        });

        // Math.log(Math.abs(elem[3]))/Math.log(10)*Math.sign(elem[3])
        return data_mapped;
    }
    return svg.node();
}
