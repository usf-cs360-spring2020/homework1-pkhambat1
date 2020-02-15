// set the dimensions and margins of the graph
var margin = {top: 40, right: 20, bottom: 45, left: 110},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
.range([height, 0])
.padding(0.1);

var x = d3.scaleLinear()
.range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
"translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("airTraffic.csv").then(function(data) {

        // format the data
        data.forEach(function(d) {
            d.passengerCount = +d.passengerCount;
        });
        
        data.forEach(function(d) {
            console.log(d);
        });
        
        // // Scale the range of the data in the domains
        x.domain([0, d3.max(data, function(d) { return d.passengerCount; }) * 1.05 ]); // * 1.05 for some extra room
        y.domain(data.map(function(d) { return d.operatingAirline; }));
        
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) { return y(d.operatingAirline); })
        .attr("height", y.bandwidth())
        // .attr("x", function(d) { return x(d.passengerCount); })
        .attr("width", function(d) { return x(d.passengerCount); });
        
        // add the x Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
        
        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
        
        svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .attr("text-anchor", "end")
        .attr("x", (width / 1.8))
        .attr("y", height + 40)
        .text("Passenger Count");
        
        svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .attr("text-anchor", "end")
        .attr("y", -20)
        .attr("dy", ".75em")
        .text("Operating Airline");
        
    });