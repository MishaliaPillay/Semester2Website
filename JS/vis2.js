// DIMENSIONS
let height = 800,
  width = 900,
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
    .style('stroke-width', 2)
    .style('fill', 'none')
    .on('mousemove', function (event, datum) {
      updateTooltip(event, datum);
    })
    .on('mouseout', function () {
      hideTooltip();
    });
    const legendData = [
      { planet: 'Venus', color: colorScale('Venus') },
      { planet: 'Earth', color: colorScale('Earth') },
      { planet: 'Merc', color: colorScale('Merc') }
    ];
    // Create legend group
let legend = svg.append('g')
.attr('class', 'legend')
.attr('transform', `translate(${width -100}, 50)`); // Adjust position as needed

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

    // Add X and Y axes
    svg.append('g').style("color", "white")   .style("font-size", "10px")
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .style("fill", "white")
      .style("font-size", "20px")
      .text("Years of Following the travel of an Asteroid");

    svg.append('g').style("color", "white")   .style("font-size", "10px")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("x", -300)
      .attr("y", -65)
      .attr('transform', 'rotate(-90)')
      .style("fill", "white")
      .style("font-size", "20px")
      .text("Miss Distance between the Asteroids and Earth");

// Add tooltip text
let tooltipText = svg.append('text')  // Moved inside createLineChart
      .attr('class', 'tooltip-text')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#fff')
      .style('visibility', 'hidden');

      let tooltipLine = svg.append('line')  // Moved inside createLineChart
      .attr('class', 'tooltip-line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,5')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', height)
      .style('visibility', 'hidden');
// Update tooltip line and text on mousemove
function updateTooltip(event, datum) {
  let xPosition = d3.pointer(event)[0];
  tooltipLine.attr('x1', xPosition).attr('x2', xPosition).style('visibility', 'visible');

  let missDistance = yScale.invert(yScale(datum.missDistance));
  tooltipText.text(missDistance.toFixed(2) + ' km')
    .attr('x', xPosition)
    .attr('y', yScale(datum.missDistance) - 10)
    .style('visibility', 'visible');
    let yPosition = yScale(datum.missDistance);
    if (!isNaN(yPosition)) {
      tooltipText.attr('y', yPosition - 10);
      // ... (rest of your code)
    } else {
      tooltipText.style('visibility', 'hidden'); // Hide tooltip if yPosition is NaN
    }
}

// Hide tooltip line and text on mouseout
function hideTooltip() {
  tooltipLine.style('visibility', 'hidden');
  tooltipText.style('visibility', 'hidden');
}



  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to create the line chart
createLineChart();
