const width = window.innerWidth;
const height = window.innerHeight;
const svg = d3.select("#threeD")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
    const centerX = width / 2;
const centerY = height / 2;

async function fetchDataInteractive() {
    let url ="https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-08-07&end_date=2022-08-14&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA";
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data.near_earth_objects;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

async function main() {
    try {
        let asteroidData = await fetchDataInteractive();
        // Process the data and create nodes for the 3D model
        const nodes = processData(asteroidData);
        const links = createLinks(nodes);
   
        // Create the 3D force simulation
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).distance(50))
            .force("charge", d3.forceManyBody().strength(-10))
            .force("center", d3.forceCenter(centerX, centerY));

        // Create lines for links
        const link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link");

        // Create circles for nodes (representing asteroids)
        const node = svg.selectAll(".node")
        
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", d => calculateRadius(d.magnitude))
            .attr("fill", "red")
            .transition()
            .duration(3000
                ).ease(d3.easeExpInOut);

        // Implement interactivity
        svg.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged));

        svg.call(d3.zoom()
            .on("zoom", zoomed));

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function zoomed(event) {
            svg.attr("transform", event.transform);
        }

        function processData(data) {
            // Process NASA API data and return nodes array
            let nodes = [];
            for (let date in data) {
                nodes = nodes.concat(data[date].map(asteroid => {
                    return {
                        miss_distance: asteroid.close_approach_data[0].miss_distance.kilometers,
                        magnitude: asteroid.absolute_magnitude_h,
                        x: centerX + (Math.random() - 0.5) * width, // Random initial x position
                        y: centerY + (Math.random() - 0.5) * height // Random initial y position
                    
                   
                   
                    };
                }));
            }
            return nodes;
        }

        function createLinks(nodes) {
            // Create links between Earth (center node) and asteroids
            return nodes.map(asteroid => {
                return {
                    source: { x: width / 2, y: height / 2 }, // Earth (center of the screen)
                    target: asteroid
                };
            });
        }

        function calculateRadius(magnitude) {
            // Calculate radius based on asteroid magnitude (adjust the scaling factor as needed)
            return magnitude * 10;
        }

    } catch (error) {
        // Handle any errors that occurred during the data retrieval
        console.error('Data retrieval error:', error);
    }
}

// Call the main function to start the process
main();
