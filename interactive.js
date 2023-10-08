document.addEventListener("DOMContentLoaded", visualizeData);

async function visualizeData() {
    const asteroidData = await fectchDataInteractive(); // Assuming fetchDataInteractive is a correct function
    let nodes = [];

    // Extract asteroid data and create nodes
    Object.keys(asteroidData.near_earth_objects).forEach(date => {
        asteroidData.near_earth_objects[date].forEach(asteroid => {
            let closestApproach = asteroid.close_approach_data[0];
            let dataForDate = {
                id: asteroid.id,
                date: new Date(closestApproach.close_approach_date),
                missDistance: parseFloat(closestApproach.miss_distance.kilometers),
                size: parseFloat(asteroid.absolute_magnitude_h),
                isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)
            };
            nodes.push(dataForDate);
        });
    });
    let rScale = d3
    .scaleSqrt()
    .domain([d3.min(nodes, d => d.size), d3.max(nodes, d => d.size)])
    .range([1 ,30]); // Scale the range of node radii
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

   
    const link = svg.selectAll(".link")
        .data(nodes)
        .enter().append("line")
        .attr("class", "link");

    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .style("stroke","#000")
        .attr("r", d => rScale(d.size))
        .attr("fill", d => (d.isHazardous ? "#FF0000" : "#1f77b4"));

    const separateButton = document.getElementById("separate-button");

    const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-2))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.radius)); // Add forceCollide

// ...

separateButton.addEventListener("click", function() {
    const hazardousNodes = nodes.filter(node => node.isHazardous);
    const nonHazardousNodes = nodes.filter(node => !node.isHazardous);

    // Apply forces to hazardous nodes
    simulation.nodes(hazardousNodes)
        .force("x", d3.forceX(width / 4).strength(0.5))
        .force("y", d3.forceY(height / 2).strength(0.5))
        .alpha(0.3)
        .restart();

    // Apply forces to non-hazardous nodes
    simulation.nodes(nonHazardousNodes)
        .force("x", d3.forceX(3 * width / 4).strength(0.5))
        .force("y", d3.forceY(height / 2).strength(0.5))
        .alpha(0.3)
        .restart();
});
    simulation.on("tick", () => {
        link.attr("x1", d => d.x)
            .attr("y1", d => d.y)
            .attr("x2", d => d.x)
            .attr("y2", d => d.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}
