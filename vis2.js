// Define the API URL
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-07&end_date=2023-08-08&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.near_earth_objects; // Adjust this based on the structure of your data
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
    throw error; // Re-throw the error for further handling if needed
  }
}

async function createScatterPlot() {
  try {
    const asteroidData = await fetchData();

    // Your D3.js code here
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(asteroidData, d => d.near_earth_objects["2023-08-07"][0].close_approach_data[0].miss_distance["kilometers"]
        )])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(asteroidData, d => d.diameter)])
      .range([height, 0]);

    // ... rest of your D3.js code ...
  } catch (error) {
    // Handle any errors that occurred during data retrieval or D3.js code execution
    console.error('Error:', error);
  }
}

// Call the function to create the scatter plot
createScatterPlot();








const width = 600; // Set the width of the SVG container
const height = 400; // Set the height of the SVG container

const svg = d3.select('body') // Select the HTML element to contain the SVG
  .append('svg')
  .attr('width', width)
  .attr('height', height);
  
  const xScale = d3.scaleLinear()
  .domain([0, d3.max(asteroidData, d => d.near_earth_objects["2023-08-07"][0].close_approach_data[0].miss_distance["kilometers"]
    )]) // Adjust the domain as needed
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(asteroidData, d => d.diameter)]) // Adjust the domain as needed
  .range([height, 0]);
  svg.selectAll('circle')
  .data(asteroidData)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.distance)) // X-coordinate based on distance
  .attr('cy', d => yScale(d.diameter)) // Y-coordinate based on diameter
  .attr('r', 5) // Set the circle radius
  .style('fill', 'blue'); // Set the circle fill color
  const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

svg.append('g')
  .call(yAxis);

// Add axis labels
svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 30)
  .style('text-anchor', 'middle')
  .text('Distance');

svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -40)
  .style('text-anchor', 'middle')
  .text('Diameter');