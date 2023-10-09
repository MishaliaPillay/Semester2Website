let height = window.innerHeight,
    width = window.innerWidth;

// CREATE SVG
let svg = d3.select("#root")
    .append("svg")
    .attr("height", height)
    .attr("width", width);
const TOLERANCE = 0.0001
// Sample API call (replace with your data fetching logic)
async function fetchData() {
    const asteroidData = await fectchDataInteractive(); // Corrected the function name
    let transformedData = transformAsteroidData(asteroidData);
    transformedData = transformedData.filter(d => !isNaN(d.size));
    console.log(transformedData);
    let rScale = d3.scaleSqrt()
      .domain([d3.min(transformedData, d => d.size), d3.max(transformedData, d => d.size)])
      .range([5,30]);
      

    // FORCE SIMULATION
    let forceXcombine = d3.forceX(width / 2).strength(0.04);
    let forceXsplit = d3.forceX(function (d) {
    return d.size <= 20 ? 100 : width - 100;
}).strength(0.4);
    let forceY = d3.forceY(height / 2).strength(0.04);
    let forceCollide = d3.forceCollide((d) => rScale(d.size)*1);
    let simulation = d3.forceSimulation(transformedData)
    .force("forceX", d3.forceX(width / 2).strength(0.04))
    .force("forceY", d3.forceY(height / 2).strength(0.04))
    .force("forceCollide", d3.forceCollide().radius(d => rScale(d.size) + 1))
    .alphaDecay(0)
    .alphaMin(0.1);
  
    function drawBubbles(data) {
      simulation.nodes(data).on("tick", ticked);
      console.log("Sizes of asteroids:", data.map(d => d.size));
      let circles = svg.selectAll()
        .data(data)
        .enter()
        .append("circle")
        .attr("r", (d) => rScale(d.size))
        .style("fill", (d) => (d.isHazardous ? "red" : "blue"))
        .on("mouseover", (event, datum) => showTooltip(datum))
        .on('mousemove', moveTooltip)
        .on("mouseout", hideTooltip);
  
      function ticked() { 
        circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y); }
      let belowThreshold = transformedData.filter(d => {
        console.log("Asteroid Size: ", d.size);
        return d.size <= 20;
         console.log(belowThreshold);
    })
    d3.select("#split").on("click", () => { removeArrow();
      simulation.force("forceX", d3.forceX(d => d.size <= 20 ? 100 : width - 100).strength(0.4)).alpha(0.5).restart();
    });
  
    d3.select("#combine").on("click", () => {  removeArrow();
      simulation.force("forceX", d3.forceX(width / 2).strength(0.04)).alpha(0.5).restart();
    });
    d3.select("#separate-by-date-button").on("click", () => { removeArrow();
      const dateScale = d3.scaleLinear()
        .domain([d3.min(transformedData, d => d.date), d3.max(transformedData, d => d.date)])
        .range([100, width - 100]);
    
      simulation.force("forceX", d3.forceX(d => dateScale(d.date)).strength(0.4)).alpha(0.5).restart();
    });
    // ... (previous code remains unchanged)
    d3.select("#speed-button").on("click", () => {
      // Sort the data by speed, from lowest to highest
      transformedData.sort((a, b) => a.speed - b.speed);
    
      // Calculate the x-scale based on sorted speeds
      const xScale = d3.scaleLinear()
        .domain([0, transformedData.length - 1])
        .range([width / 4, (3 * width) / 4]);
    
      // Apply forces to arrange bubbles based on speed
      simulation
        .nodes(transformedData)
        .force("forceX", d3.forceX(d => xScale(transformedData.indexOf(d))).strength(0.1))
        .force("forceCollide", d3.forceCollide().radius(d => rScale(d.size) + 1))
        .alpha(0.5)
        .restart();
        addArrow();
    });
    

// ... (rest of the code remains unchanged)

    
    }
  
    drawBubbles(transformedData);
  }
  function addArrow() {
    // Create an SVG arrow marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M1,1 L9,5 L1,9")
      .attr("fill", "black");
  
    // Add the arrow below the bubbles
    svg.append("line")
      .attr("x1", width / 4) // Start position (left side)
      .attr("x2", (3 * width) / 4) // End position (right side)
      .attr("y1", height - 20) // Y-coordinate of the line (just above the bottom of the SVG)
      .attr("y2", height - 20) // Y-coordinate of the line (just above the bottom of the SVG)
      .attr("marker-end", "url(#arrow)") // Attach the arrow marker
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("class", "arrow-line"); // Add a class to the arrow line for easy removal
      svg.append("text")
      .attr("x", (3 * width) / 4 - 20) // X-coordinate at the end of the arrow head (right side)
      .attr("y", height - 10) // Y-coordinate just above the bottom of the SVG
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Highest Speed")
      .attr("class", "arrow-text"); 
  }
  
  function removeArrow() {
    // Remove the arrow line by selecting it by class and removing it
    svg.select(".arrow-line").remove();
  }
  

let tooltip = d3.select('#root')
    .append('p')
    .attr("stroke", "blue", "2px")
    .style('opacity', 0)
    .style("width", "180px")
    .style("border-radius", "5px")
    .attr("font-size", "8px")
    .style('padding', "20px")
    .style("background-color", '#000')
    .style("color", '#fff')
    .style("position", "absolute")
    .style("z-index", 999);

function showTooltip(d) {
    tooltip.transition().duration(200)
        .style('opacity', 1)
        .style('left', event.pageX + 20 + "px")
        .style('top', event.pageY - 20 + "px");
    tooltip.html("Distance: " + d.missDistance.toFixed(0) + " km<br/>" + "Date: " + d3.timeFormat('%b %d')(d.date) + " Size: " + d.size + " h"   +" Speed: " + d.speed.toFixed(0) +"kmh");
}

function moveTooltip() {
    tooltip.style('left', event.pageX + 20 + 'px')
        .style('top', event.pageY - 20 + 'px');
}

function hideTooltip() {
    tooltip.style('opacity', 0);
}

function transformAsteroidData(asteroidData) {
    let dates = Object.keys(asteroidData.near_earth_objects);
    let parsedData = [];
    dates.forEach((date) => {
        asteroidData.near_earth_objects[date].forEach((asteroid) => {
            let closestApproach = asteroid.close_approach_data[0];
            let dataForDate = {
                date: new Date(closestApproach.close_approach_date),
                missDistance: parseFloat(closestApproach.miss_distance.kilometers),
                size: parseFloat(asteroid.absolute_magnitude_h),
                speed:parseFloat(closestApproach.relative_velocity.kilometers_per_hour),
                isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)


            };       
            parsedData.push(dataForDate);
        });

    });
    return parsedData;
}

// Fetch data and draw bubbles
fetchData();
