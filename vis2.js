




//DIMENSIONS
let height =800,
width=600,
margin=80;




async function createScatterPlot() {
  try {
    let asteroidData = await fetchAstData();

    // Select the SVG container element
    let svg = d3.select('#root')
      .append('svg')
      .attr('height',height+ margin +margin)
      .attr("width", width+ margin +margin )
      .append('g')
      .attr("transform",  `translate(${margin}, ${margin})`);
     // near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date
    // Parse dates and miss distances\
    let parsedData2 = asteroidData.near_earth_objects;
    console.log(parsedData2[0]);
    let parsedData = asteroidData.near_earth_objects["2023-08-07"].map((asteroid) => {
      let closestApproach = asteroid.close_approach_data[0];
      //let closestApproach = asteroidData.near_earth_objects["2023-08-07"][length ++].close_approach_data[0];
      return {
        date: new Date(closestApproach.close_approach_date),
        missDistance: parseFloat(closestApproach.miss_distance.kilometers),
        size: parseFloat(asteroid.absolute_magnitude_h),
        isHazardous: parseBool(asteroid.is_potentially_hazardous_asteroid)
      };
    });

    // Set up scales
    let xScale = d3.scaleTime()
      .domain([d3.min(parsedData, d => d.date), d3.max(parsedData, d => d.date)])
      .range([0, width]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.missDistance)])
      .range([height, 0]);
      let rScale =d3.scaleSqrt().domain([d3.min(parsedData, d => d.size), d3.max(parsedData, d => d.size)]).range([2,50])
     
    
    
    // Create circles for data points
    svg.selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.missDistance))
      .attr('r', d => rScale(d.size))
      .style("stroke", "#000")
      .style('fill', 'red')
      .style("opacity", "0.7")
      .on("mouseover", (event,datum)=>showTooltip(datum))
      .on('mousemove',moveTooltip)    
      .on("mouseout", hideTooltip)
          ; 

    // Add X and Y axes
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d, %Y'));
    let yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);
  } catch (error) {
    console.error('Error:', error);
  }
}

let tooltip = d3.select('#root')
.append('div')
.attr("stroke","blue" ,"2px") 

.style('opacity',0)
.style("width", " 180px")
.style("border-radius", "5px")
.attr("font-size" , "8px")
.style('padding',"20px")
.style("background-color", '#000')
.style("color",'#fff')
.style("position", "relative");

function showTooltip(d){
  tooltip.transition().duration(200)
  .style('opacity', 1)
  .style('left', d3.pointer(event)[0] + 100 + "px")
  .style('top', d3.pointer(event) [1] + 100 + "px")
   console.log("working ")
   tooltip.html("Distance :  " + d.missDistance +" km")
};
function moveTooltip(){
  tooltip.style('left', d3.pointer(event)[0] +100 +'px')
  .style('top',d3.pointer(event)[1]+ 100 +'px')
}
function hideTooltip(){
  tooltip.style('opacity',0);
}
// Call the function to create the scatter plot
createScatterPlot();
