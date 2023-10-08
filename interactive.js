let height = window.innerHeight,
    width = window.innerWidth;

// CREATE SVG
let svg = d3.select("#root")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

// Sample API call (replace with your data fetching logic)
async function fetchData() {
    const asteroidData = await fectchDataInteractive();
    const transformedData = transformAsteroidData(asteroidData); // Pass asteroidData as a parameter
    
    let rScale = d3.scaleSqrt()
        .domain([d3.min(transformedData, d => d.size), d3.max(transformedData, d => d.size)])
        .range([1, 30]);

    // FORCE SIMULATION
    let forceXcombine = d3.forceX(width / 2).strength(0.04);
    let forceXsplit = d3.forceX(function (d) {
        return d.isHazardous ? 700000 : 6;
    }).strength(10);
    let forceY = d3.forceY(height / 2).strength(0.04);
    let forceCollide = d3.forceCollide((d) => rScale(d.size));
    let simulation = d3.forceSimulation(transformedData)
        .force("forceXcombine", forceXcombine)
        .force("forceY", forceY)
        .force("forceCollide", forceCollide);

    function drawBubbles(data) {
        simulation.nodes(data).on("tick", ticked);

        let circles = svg.selectAll()
            .data(data)
            .enter()
            .append("circle")
            .attr("r", (d) => rScale(d.size))
            .style("fill", (d) => (d.isHazardous ? "red" : "blue"))
            .on("mouseover", (event,datum)=>showTooltipp(datum))
            .on('mousemove',moveTooltipp)    
            .on("mouseout", hideTooltipp);

        function ticked() {
            circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        }

        d3.select("#split").on("click", () => {
            let hazardousData = data.filter(d => d.isHazardous);
            simulation.force("forceXcombine", forceXsplit).nodes(hazardousData).alpha(0.5).restart();
        });

        d3.select("#combine").on("click", () => {
            simulation.force("forceXcombine", forceXcombine).alpha(0.5).restart();
        });
    }

    drawBubbles(transformedData);
}
let tooltipp = d3.select('#root')
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
    .style("z-index", 999); // Set a high z-index value


function showTooltipp(d) {
    tooltipp.transition().duration(200)
        .style('opacity', 1)
        .style('left', event.pageX + 20 + "px")
        .style('top', event.pageY - 20 + "px")
        tooltipp.html("Distance: " + d.missDistance.toFixed(0) + " km<br/>" + "Date: " + d3.timeFormat('%b %d')(d.date)   +        "       Size: "  + d.size + " h");
}

function moveTooltipp() {
    tooltipp.style('left', event.pageX + 20 + 'px')
        .style('top', event.pageY - 20 + 'px');
}
function hideTooltipp(){
  tooltipp.style('opacity',0);
}
function transformAsteroidData(asteroidData) { // Accept asteroidData as a parameter
    let dates = Object.keys(asteroidData.near_earth_objects);
    // Initialize an empty array to store parsed data for all dates
    let parsedData = [];
    dates.forEach((date) => {
        // Iterate through asteroids for the current date
        asteroidData.near_earth_objects[date].forEach((asteroid) => {
            let closestApproach = asteroid.close_approach_data[0];
            let dataForDate = {
                date: new Date(closestApproach.close_approach_date),
                missDistance: parseFloat(closestApproach.miss_distance.kilometers),
                size: parseFloat(asteroid.absolute_magnitude_h),
                isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)
            };

            // Push the parsed data for the current asteroid to the 'parsedData' array
            parsedData.push(dataForDate);
        });
    });
    return parsedData;
}

// Fetch data and draw bubbles
fetchData();
