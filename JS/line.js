// DIMENSIONS
let heightt = 800
,
    widthh = 900
  ,
    marginn = 80;

async function createLineGraph() {
  try {
    let asteroidData = await fetchAstData();

    // Select the SVG container element
    let svg = d3
      .select('#roott')
      .append('svg')
      .style('background-color', '#00a0a949')
      .attr('height', heightt + marginn + marginn)
      .attr('width', widthh + marginn + marginn)
      .append('g')
      .attr('transform', `translate(${marginn}, ${marginn})`);

    // Parse dates and miss distances
    let dates = Object.keys(asteroidData.near_earth_objects);
    let parsedData = [];
    dates.forEach((date) => {
      asteroidData.near_earth_objects[date].forEach((asteroid) => {
        let closestApproach = asteroid.close_approach_data[0];
        let dataForDate = {
          date: new Date(closestApproach.close_approach_date),
          missDistance: parseFloat(closestApproach.miss_distance.kilometers),
          size: parseFloat(asteroid.absolute_magnitude_h),
          isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid),
        };
        parsedData.push(dataForDate);
      });
    });

    //Scales
    let xScale = d3
      .scaleLinear()
      .domain([d3.min(parsedData, (d) => d.size), d3.max(parsedData, (d) => d.size)])
      .range([0, widthh]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.missDistance)])
      .range([heightt, 0]);

    

    // Draw the line 
// Filter data for hazardous and non-hazardous asteroids
let hazardousData = parsedData.filter((d) => d.isHazardous);
let nonHazardousData = parsedData.filter((d) => !d.isHazardous);

// Define the line functions for hazardous and non-hazardous asteroids
let lineHazardous = d3
  .line()
  .x((d) => xScale(d.size))
  .y((d) => yScale(d.missDistance));

let lineNonHazardous = d3
  .line()
  .x((d) => xScale(d.size))
  .y((d) => yScale(d.missDistance));

// Line Path
svg
  .append('path')
  .datum(hazardousData)
  .attr('class', 'line-hazardous')
  .attr('fill', 'none')
  .attr('stroke', 'red') // color for hazardous asteroids
  .attr('stroke-width', 2)  .style('opacity', '0.7')
  .attr('d', lineHazardous);

// Draw the line path for non-hazardous asteroids
svg
  .append('path')
  .datum(nonHazardousData)
  .attr('class', 'line-non-hazardous')
  .attr('fill', 'none')
  .attr('stroke', '#00FFFF') // color for non-hazardous asteroids
  .attr('stroke-width', 2)  .style('opacity', '0.7')
  .attr('d', lineNonHazardous);


    // Add X and Y axes 

    svg
      .append('g')
      .style('color', 'white')
      .style('font-size', '12px')
      .call(d3.axisLeft(yScale))
      .call((g) => {
        g.append('text') 
        
        .attr('x', -300)
        .attr('y', -70)
          .attr('transform', 'rotate(-90)')
          .style('fill', 'white')
        
          .style('font-size', '20px')
          .text('Miss Distance Between Earth and Asteroid (km)');
      });




      svg
  .selectAll('circle')
  .data(parsedData)
  .enter()
  .append('circle')
  .attr('cx', (d) => xScale(d.size))
  .attr('cy', (d) => yScale(d.missDistance))
  .attr('r',8) // Set the radius of the circle
  .style('fill', (d) => (d.isHazardous ? 'red' : '#00FFFF')) // Color the circle based on isHazardous property
  .style('stroke', '#000') // Set the stroke color of the circle
  .style('stroke-width', '2px')
  .style('opacity', '0.8')
  .on('mouseover', (event, datum) => showTooltip(event, datum)) // Pass event as the first argument
  .on('mousemove', moveTooltip)
  .on('mouseout', hideTooltip);

// Tool Tip information
let tooltipp = d3.select('#roott')
  .append('div')
  .style('position', 'absolute')
  .style('opacity', 0)
  .style('background-color', '#000')
  .style('color', '#fff')
  .style('padding', '10px')
  .style('border-radius', '5px');

function showTooltip(event, d) {
  tooltipp.transition().duration(200)
    .style('opacity', 1)
    .style('left', event.pageX + 10 + 'px') // Use event.pageX and event.pageY to get the mouse position
    .style('top', event.pageY + 10 + 'px')
  tooltipp.html("Distance: " + d.missDistance.toFixed(0) + " km<br/>" + "Date: " + d3.timeFormat('%b %d')(d.date));
};

function moveTooltip(event) {
  tooltipp.style('left', event.pageX + 10 + 'px')
    .style('top', event.pageY + 10 + 'px');
};

function hideTooltip() {
  tooltipp.transition().duration(200).style('opacity', 0);
};

    svg
      .append('g')
      .style('color', 'white')
      .style('font-size', '12px')
      .attr('transform', `translate(0, ${heightt})`)
      .call(d3.axisBottom(xScale))
      .call((g) => {
        g.append('text')
          .attr('x', widthh / 2)
          .attr('y', +35)
          .style('fill', 'white')
          .style('fill', 'white')
          .style('font-size', '20px')
          .text('Size of Asteroid (h)');
      });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to create the line graph
createLineGraph();


//responsive 
// Function to update dimensions based on window size
function updateDimensions() {
  heightt = window.innerHeight - 2 * marginn; // Subtract 2 times margin from window height
  widthh = window.innerWidth - 2 * marginn; // Subtract 2 times margin from window width

  // Update SVG dimensions
  d3.select('svg')
    .attr('height', heightt + marginn + marginn)
    .attr('width', widthh + marginn + marginn);

  // Update scales
  xScale.range([0, widthh]);
  yScale.range([heightt, 0]);

  // Update circles
  svg.selectAll('circle')
    .attr('cx', (d) => xScale(d.size))
    .attr('cy', (d) => yScale(d.missDistance));

  // Update line paths
  svg.select('.line-hazardous').attr('d', lineHazardous(hazardousData));
  svg.select('.line-non-hazardous').attr('d', lineNonHazardous(nonHazardousData));

  // Update X and Y axes
  svg.select('.x-axis').call(d3.axisBottom(xScale));
  svg.select('.y-axis').call(d3.axisLeft(yScale));
}

// Call the updateDimensions function on initial load
//updateDimensions();

// Call the updateDimensions function whenever the window is resized
//window.addEventListener('resize', updateDimensions);
 