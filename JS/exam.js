function updateGraph(data) {
    const svgWidth = window.innerWidth/1.5; // Set your desired SVG width
    const svgHeight =  window.innerHeight/1.5; // Set your desired SVG height
    const padding = { top: 40, right: 20, bottom: 20, left: 50 }; // Set padding values
    let isPaused = false; // Variable to track whether the animation is paused

   
    const svg = d3.select("#visualization")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("background-color", '#000');
 
    // Extract all closest approach dates, miss distances, and relative velocities
    const approachData = data.near_earth_objects.flatMap((asteroid, page) => {
        return asteroid.close_approach_data.map(approach => ({
           
            approachDate: new Date(approach.close_approach_date_full),
            missDistance: approach.miss_distance.kilometers,
            relativeVelocity: approach.relative_velocity.kilometers_per_second
        }));
    });


    // Create a scale for the y-axis based on approach dates
    const yScale = d3.scaleTime()
        .domain(d3.extent(approachData, d => d.approachDate))
        .range([svgHeight - padding.bottom, padding.top]);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale)
        .ticks(10);

    // Append y-axis to the SVG
    svg.selectAll(".y-axis").remove();
    svg.append("g")
    .style("color", "white")
        .attr("class", "y-axis")
        .attr("transform", `translate(${padding.left}, 0)`)
        .call(yAxis);

    // Add y-axis title
    svg.append("text")
    .style('fill', 'white')
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("The Years of the Closest Approaches");

    // Create lines representing relative velocities with gradient
    const lines = svg.selectAll("line")
        .data(approachData)
        .enter().append("line")
        .attr("x1", padding.left)
        .attr("y1", d => yScale(d.approachDate))
        .attr("x2", padding.left) // Initial x2 position is the same as x1
        .attr("y2", d => yScale(d.approachDate))
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "3"); // Set dash pattern

    // Add a gradient for each line
    lines.each(function (d, i) {
        const line = d3.select(this);
        const gradientId = "line-gradient-" + i;

        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", gradientId)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", padding.left)
            .attr("y1", yScale(d.approachDate))
            .attr("x2", svgWidth - padding.right)
            .attr("y2", yScale(d.approachDate));

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "teal");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "red");

        line.attr("stroke", "url(#" + gradientId + ")");
    });
    console.log("Number of lines on the graph:", lines.size());
    document.getElementById('fast').addEventListener('click', () => {
        // Filter data for asteroids with velocities greater than 15 km/s
        const fastData = approachData.filter(d => d.relativeVelocity > 15);
    
        // Update the lines based on the filtered data
        svg.selectAll("line")
            .data(approachData) // Use original data for all asteroids
            .attr("stroke-opacity", d => (fastData.includes(d) ? 1 : 0.1)); // Set opacity for fast asteroids
    });
    
    document.getElementById('slow').addEventListener('click', () => {
        // Filter data for asteroids with velocities less than or equal to 15 km/s
        const slowData = approachData.filter(d => d.relativeVelocity <= 15);
    
        // Update the lines based on the filtered data
        svg.selectAll("line")
            .data(approachData) // Use original data for all asteroids
            .attr("stroke-opacity", d => (slowData.includes(d) ? 1 : 0.1)); // Set opacity for slow asteroids
    });
    // Function to get the slider value and update animation speed
// Function to get the slider value and update animation speed
function updateAnimationSpeed() {
    const slider = document.getElementById('speedSlider');
    const speedValue = parseInt(slider.value); // Get the slider value

    setAnimationSpeed(speedValue); // Update animation speed using your existing setAnimationSpeed function
}

// Event listener for slider change
document.getElementById('speedSlider').addEventListener('input', updateAnimationSpeed);


    
// Add tooltips to lines
lines.append("title")
    .text(d => `Approach Date: ${d.approachDate}\nMiss Distance: ${d.missDistance} km\nRelative Velocity: ${d.relativeVelocity} km/s`);

// Add hover effect to lines with tooltips
lines.on("mouseover", function (event, d) {
    d3.select(this)
        .attr("stroke-width", 4) // Increase stroke width on hover for highlighting effect
        .attr("stroke", "white"); // Change stroke color on hover

    // Show tooltip
    d3.select(this)
        .append("title")
        .text(`Approach Date: ${d.approachDate}\nMiss Distance: ${d.missDistance} km\nRelative Velocity: ${d.relativeVelocity} km/s`);
})
    .on("mouseout", function () {
        d3.select(this)
            .attr("stroke-width", 2) // Revert stroke width on mouseout
            .attr("stroke", "url(#line-gradient-" + lines.nodes().indexOf(this) + ")"); // Revert stroke color

        // Remove tooltip
        d3.select(this)
            .select("title")
            .remove();
});


        let animationSpeed = 5; // Initial speed, can be adjusted
let requestId; // Variable to store requestAnimationFrame ID

// Function to adjust the animation speed
function setAnimationSpeed(speed) {
    animationSpeed = speed;
}

function linesAtEnd() {
    const lineNodes = lines.nodes(); // Get the array of DOM nodes for the lines

    // Check if all lines have reached the end
    return lineNodes.every(node => {
        const x2AttributeValue = node.getAttribute('x2'); // Get the x2 attribute value
        const x2Value = parseFloat(x2AttributeValue); // Parse the x2 attribute value as a float

        return x2Value >= svgWidth - padding.right;
    });
}
 // Function to pause the animation
 function pauseLines() {
    isPaused = true; // Set the paused state to true
    if (requestId) {
        cancelAnimationFrame(requestId); // Cancel the animation frame request
    }
}

// Event listener for the pause button
document.getElementById('pause').addEventListener('click', pauseLines);


// Move lines constantly in a loop
function moveLines() {
    if (isPaused) {
        return;
    }

    lines.transition()
   
        .duration((d) => 10000 / d.relativeVelocity * animationSpeed)
        .attrTween("x2", function (d) {
            return function (t) {
                const missDistanceScale = d3.scaleLinear()
                    .domain([0, d.missDistance])
                    .range([padding.left, svgWidth - padding.right]);
                return missDistanceScale(t * d.missDistance);
            };
        })
        .on('end', function () {
            if (!isPaused && !linesAtEnd()) {
                requestId = requestAnimationFrame(moveLines);
            }
        });
}

function playLines() {
    isPaused = false;
    setAnimationSpeed(5); // Adjust the speed when playing

    // Cancel existing animation frame request if any
    if (requestId) {
        cancelAnimationFrame(requestId);
    }

    // Reset lines to initial position
    lines.transition()
    
        .duration(0)
        .attr("x1", padding.left)
        .attr("x2", padding.left);

    // Start the movement
    requestId = requestAnimationFrame(moveLines);
}


document.getElementById('play').addEventListener('click', playLines);
        

    // Add a semi-circle on the right side
    const semiCircleRadius = (svgHeight - padding.top - padding.bottom) / 3;
    const semiCircleCenterX = svgWidth - padding.right;
    const semiCircleCenterY = svgHeight / 2;

    const semiCircle = d3.arc()
        .innerRadius(0)
        .outerRadius(semiCircleRadius)
        .startAngle(Math.PI) // Start angle at 180 degrees
        .endAngle(-Math.PI); // End angle at 0 degrees

    svg.append("path")
        .attr("d", semiCircle)
        .attr("fill", "aliceblue")
        .attr("transform", `translate(${semiCircleCenterX}, ${semiCircleCenterY})`);

    // Add a circle within the semi-circle
    const circleRadius = semiCircleRadius / 2;
    const circleCenterX = semiCircleCenterX;
    const circleCenterY = semiCircleCenterY;

    svg.append("circle")
        .attr("cx", circleCenterX)
        .attr("cy", circleCenterY)
        .attr("r", circleRadius)
        .attr("fill", "darkblue");
// Add x-axis title
// Add x-axis title
svg.append("text")
    .style('fill', 'white')
    .attr("y","1%")
    .attr("transform", `translate(${(svgWidth - padding.left - padding.right) / 2 + padding.left}, ${svgHeight - padding.bottom + 10})`)
    .style("text-anchor", "middle")
    .text("Simulation: Speed of the Asteroids");

// Add white line above x-axis
svg.append("line")
    .attr("x1", padding.left)
    .attr("y1", svgHeight - padding.bottom)
    .attr("x2", svgWidth - padding.right)
    .attr("y2", svgHeight - padding.bottom)
    .style("stroke", "white")
    .style("stroke-width", 1); // Adjust the stroke width as needed

}





