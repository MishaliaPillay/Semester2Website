//DIMENSIONS
let height =600,
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
      let closestApproach = asteroidData.near_earth_objects["2023-08-07"][0].close_approach_data[0];
      return {
        date: new Date(closestApproach.close_approach_date),
        missDistance: parseFloat(closestApproach.miss_distance.kilometers),
      };
    });
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
      .attr('r', 5)
      .style('fill', 'red');

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

// Call the function to create the scatter plot
createScatterPlot();