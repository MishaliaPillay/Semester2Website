// DIMENSIONS
let heightt = 800,
    widthh = 900,
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

    // Set up scales for line graph
    let xScale = d3
      .scaleLinear()
      .domain([d3.min(parsedData, (d) => d.size), d3.max(parsedData, (d) => d.size)])
      .range([0, widthh]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.missDistance)])
      .range([heightt, 0]);

    // Define the line function
    let line = d3
      .line()
      .x((d) => xScale(d.size))
      .y((d) => yScale(d.missDistance));

    // Draw the line
    svg
      .append('path')
      .datum(parsedData)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add X and Y axes 

    svg
      .append('g')
      .style('color', 'white')
      .style('font-size', '12px')
      .call(d3.axisLeft(yScale))
      .call((g) => {
        g.append('text')
          .attr('x', -300)
          .attr('y', -65)
          .attr('transform', 'rotate(-90)')
          .style('fill', 'white')
          .attr('padding', '40px')
          .style('font-size', '20px')
          .text('Miss Distance Between Earth and Asteroid (km)');
      });/*
      svg
      .selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.size))
      .attr('cy', (d) => yScale(d.missDistance))
      .attr('r', 5) // Set the radius of the circle
      .style('fill', (d) => (d.isHazardous ? 'red' : 'steelblue')) // Color the circle based on isHazardous property
      .style('stroke', '#000') // Set the stroke color of the circle
      .style('opacity', '0.7')
      .on('mouseover', (event, datum) => showTooltip(datum))
     .on('mousemove', moveTooltip)
      .on('mouseout', hideTooltip);

      //Tool Tip information 
      let tooltipp = d3.select('#roott')
            .append('p')
            .attr("stroke","blue" ,"2px") 

                .style('opacity',0)
            .style("width", " 180px")
        .style("border-radius", "5px")
        .attr("font-size" , "8px")
        .style('padding',"20px")
        .style("background-color", '#000')
        .style("color",'#fff')
        .style("position", "relative");
      function showTooltip(d) {
        tooltipp.transition().duration(200)
          .style('opacity', 1)
          .style('left', d3.pointer(event)[0] + 100 + "px")
          .style('top', d3.pointer(event)[1] + 100 + "px")  
          console.log("working ")
          tooltipp.html("Distance: " + d.missDistance.toFixed(0) + " km<br/>" + "Date: " + d3.timeFormat('%b %d')(d.date));
      };
      function moveTooltip(){
        tooltipp.style('left', d3.pointer(event)[0] +100 +'px')
        .style('top',d3.pointer(event)[1]+ 100 +'px')
      };
      function hideTooltip(){
        tooltipp.style('opacity',0);
      };*/




      svg
  .selectAll('circle')
  .data(parsedData)
  .enter()
  .append('circle')
  .attr('cx', (d) => xScale(d.size))
  .attr('cy', (d) => yScale(d.missDistance))
  .attr('r',8) // Set the radius of the circle
  .style('fill', (d) => (d.isHazardous ? 'red' : 'white')) // Color the circle based on isHazardous property
  .style('stroke', '#000') // Set the stroke color of the circle
  .style('opacity', '0.7')
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