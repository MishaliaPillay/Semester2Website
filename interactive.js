async function visualizeData() {
    const asteroidData = await fectchDataInteractive(); // Assuming fetchData function returns parsed asteroid data
    console.log(asteroidData);
  
    // Extract asteroid data and create nodes
    let dates = Object.keys(asteroidData.near_earth_objects);
    let nodes = [];
    let centralNode = { isCentral: true }; // Create a central node
  
    dates.forEach(date => {
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
  
    // Set up D3 simulation

    const svgWidthFraction = 0.8; // 80% of window width
    const svgHeightFraction = 0.6; // 60% of window height
    
    const width = window.innerWidth * svgWidthFraction;
    const height = window.innerHeight * svgHeightFraction;
    
    const svg = d3
      .select("#graph-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));
  
 
    // Draw links
    const link = svg
      .selectAll(".link")
      .data(nodes)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);
  
    // Create a scale for node radii
    let rScale = d3
      .scaleSqrt()
      .domain([d3.min(nodes, d => d.size), d3.max(nodes, d => d.size)])
      .range([1, 30]);
  
    // Draw nodes with dynamic radii based on asteroid sizes
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("stroke", "#000")
      .attr("r", d => (rScale(d.size)))
      .attr("fill", d => (d.isHazardous ? "#FF0000" : "#1f77b4"));
  
    // Simulation tick function
    simulation.on("tick", () => {
      link
        .attr("x1", width / 2) // Central x-coordinate
        .attr("y1", height / 2) // Central y-coordinate
        .attr("x2", d => d.x)
        .attr("y2", d => d.y);
  
      node.attr("cx", d => d.x).attr("cy", d => d.y);
    });
  }
  
  visualizeData();
  