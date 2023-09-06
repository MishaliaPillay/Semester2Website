




//DIMENSIONS
let height =1000,
width=600,
margin=80;




async function createScatterPlot() {
  try {
    let asteroidData = await fetchAstData();

    // Select the SVG container element
    let svg = d3.select('section')
      .append('svg')
      .attr('height',height+ margin +margin)
      .attr("width", width+ margin +margin )
      .append('g')
      .attr("transform",  `translate(${margin}, ${margin})`);
     // near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date
    // Parse dates and miss distances\
  
    let parsedData = asteroidData.near_earth_objects["2023-08-07"].map((asteroid) => {
      let closestApproach = asteroid.close_approach_data[0];
      //let closestApproach = asteroidData.near_earth_objects["2023-08-07"][length ++].close_approach_data[0];
      return {
        date: new Date(closestApproach.close_approach_date),
        missDistance: parseFloat(closestApproach.miss_distance.kilometers),
      };
    });
   console.log(parsedData);
    // Set up scales
    let xScale = d3.scaleTime()
      .domain([d3.min(parsedData, d => d.date), d3.max(parsedData, d => d.date)])
      .range([0, width]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.missDistance)])
      .range([height, 0]);

    // Create circles for data points
    svg.selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.missDistance))
      .attr('r', 1.5)
      .style('fill', 'blue')
      .on("mouseover", (event,datum)=>showTooltip(datum))
      .on('mousemove',moveTooltip)
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
.style('opacity',0)
.style("width", " 150px")
.style("border-radius", "5px")
.style('padding',"12px")
.style("background-color", '#000')
.style("color",'#fff')
.style("position", "relative");

function showTooltip(d){
  tooltip.transition().duration(300)
  .ease(d3.easeBounce)
  .style('opacity', 1)
 
  .style('left', d3.pointer(event)[0] + 70 + "px")
  .style('top', d3.pointer(event) [1] - 540 + "px")
   console.log("working ")
   tooltip.html("Distance:" + d.missDistance)
};
function moveTooltip(){
  tooltip.style('left', d3.pointer(event)[0] +70 +'px')
  .style('top',d3.pointer(event)[1]-540 +'px')
}

// Call the function to create the scatter plot
createScatterPlot();