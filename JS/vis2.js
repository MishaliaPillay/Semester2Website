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
      .style('fill', 'none');

    // Add X and Y axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .style("fill", "white")
      .style("font-size", "20px")
      .text("Date");

    svg.append('g')
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("x", -300)
      .attr("y", -65)
      .attr('transform', 'rotate(-90)')
      .style("fill", "white")
      .style("font-size", "20px")
      .text("Miss Distance (km)");

  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to create the line chart
createLineChart();
