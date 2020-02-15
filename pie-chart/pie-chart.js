// margin
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 960 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = 150;

// color range
var color = d3.scaleOrdinal()
    .range(["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"]);

// pie chart arc. Need to create arcs before generating pie
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// arc for the labels position
var labelArc = d3.arc()
    .outerRadius(radius + 20)
    .innerRadius(radius + 20);

// generate pie chart and donut chart
var pie = d3.pie()
    .sort((a, b) => d3.ascending(a.geoRegion, b.geoRegion))
    .value(d => d.passengerCount);

// define the svg for pie chart
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// import data 
d3.csv("data.csv").then(function(data) {
    
    // parse data
    data.forEach(function(d) {
        d.passengerCount = +d.passengerCount;
    })

  // "g element is a container used to group other SVG elements"
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  // append path 
  g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.geoRegion));
        
  // append text
  g.append("text")
    .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text(d => d.data.geoRegion);

      // append text
  g.append("text")
  .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
    .attr("dy", "1.7em")
    .text(d => d.data.passengerCount.toLocaleString());
    
});
