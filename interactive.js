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
    const transformedData = transformAsteroidData(asteroidData);
    
    console.log(transformedData);
    let rScale = d3.scaleSqrt()
      .domain([d3.min(transformedData, d => d.size), d3.max(transformedData, d => d.size)])
      .range([5,30]);
  
    // FORCE SIMULATION
    let forceXcombine = d3.forceX(width / 2).strength(0.04);
    let forceXsplit = d3.forceX(function (d) {
      // Modify this function to split based on size (magnitude) threshold (20 in this case)
      return d => d.size <= 20 ? 100 : width - 100;
    }).strength(0.5);
  
    let forceY = d3.forceY(height / 2).strength(0.04);
    let forceCollide = d3.forceCollide((d) => rScale(d.size));
    let simulation = d3.forceSimulation(transformedData)
      .force("forceXcombine", forceXcombine)
      .force("forceY", forceY)
      .force("forceCollide", forceCollide);
  
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
        circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      }
      let belowThreshold = transformedData.filter(d => {
        console.log("Asteroid Size: ", d.size);
        return d.size <= 20;
         console.log(belowThreshold);
    })
      d3.select("#combinee").on("click", () => {
        console.log("Split button clicked");
        // Split the data based on the size (magnitude) threshold (20 in this case)
        let belowThreshold = transformedData.filter(d => {
            console.log("Size of Asteroid: ", d.size);
            return d.size <= 20;
        });
        let aboveThreshold = transformedData.filter(d => d.size > 20);
    
   
        console.log("Below Threshold Data:");
   
        // Apply forces to the filtered data subsets
        simulation.nodes(belowThreshold).force("forceXcombine", forceXsplit).alpha(0.5).restart();
        simulation.nodes(aboveThreshold).force("forceXcombine", forceXsplit).alpha(0.5).restart();
      });
  
      d3.select("#combine").on("click", () => { console.log("combine button clicked");
        simulation.force("forceXcombine", forceXcombine).alpha(0.5).restart();
      });
    }
  
    drawBubbles(transformedData);
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
    tooltip.html("Distance: " + d.missDistance.toFixed(0) + " km<br/>" + "Date: " + d3.timeFormat('%b %d')(d.date) + " Size: " + d.size + " h");
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
                isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)
            };
            parsedData.push(dataForDate);
        });
    });
    return parsedData;
}

// Fetch data and draw bubbles
fetchData();
