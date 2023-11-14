// DIMENSIONS
const width = window.innerWidth/2;
const height = window.innerHeight/2;
let
  margin = 80;

async function createLineChart() {
  try {
    let asteroidData = await fetchAstData2();

    // Group data by planets
    let groupedData = d3.group(asteroidData.close_approach_data.slice(100), d => d.orbiting_body);

    // Convert grouped data to an array of objects
    let planetData = Array.from(groupedData, ([planet, data]) => {
      return {
        planet: planet,
        data: data.map(d => ({
          date: new Date(d.close_approach_date),
          missDistance: parseFloat(d.miss_distance.kilometers)
        }))
      };
    });

    // Set up SVG dimensions and margins
    let svg = d3.select('#root')
      .append('svg').style("background-color", '#00a0a949')
      .attr('height', height + margin + margin)
      .attr("width", width + margin + margin)
      .append('g')
      .attr("transform", `translate(${margin}, ${margin})`);

    // Set up scales
    let xScale = d3.scaleTime()
      .domain(d3.extent(asteroidData.close_approach_data.slice(100), d => new Date(d.close_approach_date)))
      .range([0, width]);

      let yScale = d3.scaleLinear()
      .domain([0, d3.max(planetData, planet => d3.max(planet.data, d => d.missDistance))])
      .nice()
      .range([height, 0]);
   

    let colorScale = d3.scaleOrdinal()
      .domain(['Venus', 'Earth', 'Merc'])
      .range(d3.schemeCategory10);

    // Create line generator
    let line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.missDistance));

    // Append lines to the chart
    svg.selectAll('.line')
    .data(planetData)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.data))
    .style('stroke', d => colorScale(d.planet))
    .style('stroke-width', 4)
    .style('fill', 'none')
    ;
    const legendData = [
      { planet: 'Venus', color: colorScale('Venus') },
      { planet: 'Earth', color: colorScale('Earth') },
      { planet: 'Merc', color: colorScale('Merc') }
    ];
    // Create legend group
let legend = svg.append('g')
.attr('class', 'legend')
.attr('transform', `translate(${width -90}, 20)`); // Adjust position as needed

// Create legend items
let legendItems = legend.selectAll('.legend-item')
.data(legendData)
.enter()
.append('g')
.attr('class', 'legend-item')
.attr('transform', (d, i) => `translate(0, ${i * 25})`); // Adjust spacing as needed

// Add colored rectangles to the legend
legendItems.append('rect')
.attr('width', 20)
.attr('height', 20)
.attr('fill', d => d.color);
legend.append('rect')
  .attr('width', 150) // Adjust width as needed
  .attr('height', legendData.length * 25) // Adjust height based on the number of legend items
  .attr('fill', 'rgba(255, 255, 255, 0.071'); // Semi-transparent black background

// Add planet names to the legend
legendItems.append('text')
.attr('x', 30) // Adjust position of text relative to rectangles
.attr('y', 15)
.attr('dy', '0.35em')
.text(d => d.planet)
.style('fill', 'white')
.style('font-size', '14px');




// Create vertical line for tooltip
let verticalLine = svg.append('line')
  .attr('class', 'vertical-line')
  .attr('stroke', '#ccc')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', '5,5')
  .attr('y1', 0)
  .attr('y2', height)
  .style('visibility', 'hidden');

// Create tooltip for vertical line
let verticalTooltip = svg.append('text')
  .attr('class', 'vertical-tooltip')
  .attr('text-anchor', 'middle')
  .style('font-size', '14px')
  .style('fill', '#fff')
  .style('visibility', 'hidden');


// Update tooltip line and text on mousemove


// Helper function to find the closest data point to a given x-value
function findClosestDataPoint(data, xValue) {
  let bisector = d3.bisector(d => d.date).left;
  let index = bisector(data, xValue, 1);
  let left = data[index - 1];
  let right = data[index];
  return right && (right.date - xValue < xValue - left.date) ? right : left;
}



svg.on('mousemove', function (event) {
  updateVerticalTooltip(event);
});

// Helper function to update the vertical line and tooltip content
function updateVerticalTooltip(event) {
  let [xPosition] = d3.pointer(event);
  verticalLine.attr('x1', xPosition).attr('x2', xPosition).style('visibility', 'visible');

  // Find data points at the x-position using the xScale invert method
  let invertedX = xScale.invert(xPosition);
  let tooltipContent = planetData.map(planet => {
    let closestDataPoint = findClosestDataPoint(planet.data, invertedX);
    return `${planet.planet}: ${Math.round(closestDataPoint.missDistance)} km`;
  }).join('\n');

  // Get the width and height of the tooltip content for styling the box
  let bbox = verticalTooltip.node().getBBox();

  // Update the tooltip text and position
  verticalTooltip.text(tooltipContent)
    .attr('x', xPosition)
    .attr('y', -10 - bbox.height)  // Adjust the y position to place tooltip above the line
    .style('visibility', 'visible')
    .style('fill', 'white').style("font-weight", "Bold");

  // Add a rectangle behind the tooltip text to create a box
  verticalTooltipBox
    .attr('x', bbox.x - 5)  // Add some padding to the left
    .attr('y', bbox.y - 5)  // Add some padding to the top
    .attr('width', bbox.width + 10)  // Add padding to both sides
    .attr('height', bbox.height + 10)  // Add padding to the top and bottom
    .style('visibility', 'visible');
}

// Create tooltip box
let verticalTooltipBox = svg.append('rect')
  .attr('class', 'tooltip-box')
  .style('fill', 'rgba(255, 255, 255, 0.1)')  // Set the background color and opacity
  .style('stroke', 'white')  // Set the border color
  .style('stroke-width', 1)  // Set the border width
  .style('visibility', 'hidden');  // Initially hide the tooltip box


// Mouseout event listener
svg.on('mouseout', function () {  verticalTooltipBox.style('visibility', 'hidden');
  verticalLine.style('visibility', 'hidden');
  verticalTooltip.style('visibility', 'hidden');
});











    // Add X and Y axes
    svg.append('g').style("color", "white")   .style("font-size", "10px")
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 45)
      .style("fill", "white")
      .style("font-size", "150%")
      .text("Years of Following the travel of an Asteroid");

    svg.append('g').style("color", "white")   .style("font-size", "10px")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("x", "-5%")
      .attr("y", "-13%")
      .attr('transform', 'rotate(-90)')
      .style("fill", "white")
      .style("font-size", "150%")
      .text("Miss Distance between the Asteroids and Earth");


  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to create the line chart
createLineChart();
