

const svgWidth = 1080;
const svgHeight = 600;
const defaultOpacity = 0.1;
const selectedOpacity = 1.0;
let selectedOrbitingBody = null;

const svg = d3.select('#my_dataviz')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${svgWidth/2 },${svgHeight/2 })`);
  


    // Append the background rectangle
svg.append('rect')
.attr('width', svgWidth)
.attr('height', svgHeight)
.attr('fill', 'black');

// Calculate the position for the background rectangle
const backgroundRectWidth = svgWidth;
const backgroundRectHeight = svgHeight;
const backgroundRectX = -backgroundRectWidth / 2;
const backgroundRectY = -backgroundRectHeight / 2;

// Append the centered background rectangle
svg.append('rect')
.attr('width', backgroundRectWidth)
.attr('height', backgroundRectHeight)
.attr('x', backgroundRectX)
.attr('y', backgroundRectY)
.attr('fill', 'black');
async function main() {
    try {
        let asteroidData = await fetchAstData2();
        let processedData = [];

        asteroidData.near_earth_objects.forEach(asteroid => {
            asteroid.close_approach_data.forEach(approach => {
                const orbitingBody = approach.orbiting_body;
                if (orbitingBody && orbitingBody !== "Juptr" && asteroid.name) {
                    processedData.push({
                        name: asteroid.name,
                        closestApproachDate: approach.close_approach_date,
                        missDistance: parseFloat(approach.miss_distance.kilometers),
                        orbitingBody: orbitingBody,
                        absolute_magnitude_h: parseFloat(asteroid.absolute_magnitude_h)
                    });
                }
            });
        });

        processedData.sort((a, b) => b.absolute_magnitude_h - a.absolute_magnitude_h); // Sort by magnitude descending

        const magnitudeScale = createMagnitudeScale(processedData);
        createCircularBarPlot(processedData);
        createButtons();
        createAsteroidCircles(svg, processedData, magnitudeScale);
    } catch (error) {
        console.error('Data retrieval error:', error);
    }
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function() {
    selectedOrbitingBody = 'all';
updateBarsOpacity();
});
    
    function createButtons() {
        const buttons = document.querySelectorAll('.startButton');
    
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                selectedOrbitingBody = this.id;
                updateBarsOpacity();
            });
        });
    }
    
    function updateBarsOpacity() {
        svg.selectAll('.bar')
        .attr('opacity', d => {
            if (selectedOrbitingBody === null || selectedOrbitingBody === 'all') {
                return selectedOpacity;
            } else if (d.orbitingBody && selectedOrbitingBody) {
                return d.orbitingBody === selectedOrbitingBody ? selectedOpacity : defaultOpacity;
            } else {
                return defaultOpacity;
            }
        });
    }
    

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    
function createCircularBarPlot(data) {
    data.sort((a, b) => new Date(a.closestApproachDate) - new Date(b.closestApproachDate));

    const maxMissDistance = d3.max(data, d => d.missDistance);
    const innerRadius = 100; // Set your desired inner radius
     const outerRadius = Math.min(svgWidth, svgHeight) / 2;
    


  
    // Calculate miss distance ticks for the radial axis
// Calculate miss distance ticks for the radial axis based on the data
const numTicks =5; // Change this value to set the number of ticks you want
const missDistanceTicks = d3.range(numTicks +1).map(i => i * (maxMissDistance / numTicks));

     // Create radial scale for the miss distances
     const radialScale = d3.scaleRadial()
         .domain([0, maxMissDistance])
         .range([innerRadius, outerRadius]);
 
     // Add radial axis
     svg.append('g')
         .attr('class', 'radial-axis')
         .selectAll('circle')
         .data(missDistanceTicks)
         .enter()
         .append('circle')
         .attr('cx', 0)
         .attr('cy', 0)
         .attr('r', d => radialScale(d))
         .style('fill', 'none')
         .style('stroke', 'white')
         .style('stroke-dasharray', '3,3');
 
     // Add radial axis labels
     svg.select('.radial-axis')
         .selectAll('text')
         .data(missDistanceTicks)
         .enter()
         .append('text')
         .attr('x', 10)
         .attr('y', d => -radialScale(d))
         .attr('dy', '0.35em')
         .style('font-size', '10px')
         ;

         // Inside the createCircularBarPlot function:

const numBars = data.length;
const totalAngle = 2 * Math.PI; // Total angle of the circle

// Calculate the width of each bar to achieve equal spacing
const barWidth = totalAngle / numBars;

    const maxAbsoluteMagnitude = d3.max(data, d => d.absolute_magnitude_h);
    const bars = svg.selectAll('.bar')
    .data(data.filter(d => d.orbitingBody !== undefined && d.name !== undefined)) // Filter out data points without orbitingBody or name defined
    .enter()
    .append('g')
    .attr('class', 'bar');

// Append circles
const circles = svg.selectAll('circle')
    .data(data.filter(d => d.orbitingBody !== undefined)) // Filter out data points without orbitingBody defined
    .enter()
    .append('circle')
    // Update the radius scale domain based on the maximum absolute_magnitude_h value
    const radiusScale = d3.scaleLinear()
        .domain([0, maxAbsoluteMagnitude]) // Update the domain to match the absolute_magnitude_h values
        .range([innerRadius, outerRadius]);
        const planetRadius = 100; // Set the radius of the planet circle

        // Create the inner white circle with animation
        svg.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 50) // Initial radius set to 50 (will be animated)
          .classed('inner-circle', true); // Apply the inner-circle class for styling and animation
        
        // Apply the blur filter to the glowing outline and inner circle
        svg.selectAll('.glowing-outline, .inner-circle')
          .classed('blur-filter', true); // Apply the blur filter class
        
        // Rest of your code...
        
   
    // Create a textured pattern for the planet's surface
  
    
    // ... (remaining code remains unchanged)
// Inside the createCircularBarPlot function:
bars.append('path')
    .attr('d', d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(function(d) {
            // Check if orbitingBody is defined before accessing it
            if (d.orbitingBody !== undefined) {
                // Calculate outer radius based on absolute_magnitude_h to change bar widths
                return innerRadius + ((d.absolute_magnitude_h / maxAbsoluteMagnitude) * (outerRadius - innerRadius));
            } else {
                // Handle the case where orbitingBody is undefined (set a default value or handle as appropriate)
                return 0;
            }
        })
        .startAngle((d, i) => Math.PI / 2 + i * barWidth)
        .endAngle((d, i) => Math.PI / 2 + (i + 1) * barWidth)
        .padAngle(0.1)
        .padRadius(innerRadius * 200)
    )
    .attr('stroke', d => colorScale(d.name))
    .append('title')
    .text(d => `Name: ${d.name}\nOrbiting Body: ${d.orbitingBody}\nClosest Approach Date: ${d.closestApproachDate}\nMiss Distance: ${d.missDistance} kilometers\nAbsolute Magnitude: ${d.absolute_magnitude_h}`);

    // Legend
    const uniqueAsteroids = Array.from(new Set(data.map(d => d.name)));
    const colorMap = {};
    uniqueAsteroids.forEach((asteroid, index) => {
        colorMap[asteroid] = colorScale(index);
    });

    const legend = svg.selectAll('.legend')
        .data(uniqueAsteroids)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(-${svgWidth / 2},${svgHeight / 12 - 250 + i * 20})`);
// Add label above legend
svg.append('text')
    .attr('x', svgWidth / 3) // X-coordinate for the label (adjust as needed)
    .attr('y', -230) // Y-coordinate for the label (adjust as needed)
    .attr('text-anchor', 'right')
    .style('font-size', '16px')
    .style('fill', 'white')
    .text('Legend:');

    legend.append('rect')
        .attr('x', svgWidth - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d => colorMap[d]);

    legend.append('text')
        .attr('x', svgWidth - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(d => d)
        .style('fill', 'white');
}
function createMagnitudeScale(data) {
    const maxAbsoluteMagnitude = d3.max(data, d => d.absolute_magnitude_h);
    const minAbsoluteMagnitude = d3.min(data, d => d.absolute_magnitude_h);
    return d3.scaleLinear()
        .domain([minAbsoluteMagnitude, maxAbsoluteMagnitude])
        .range([svgHeight / 3, -svgHeight / 3]); // Invert the range for vertical scale
}

function createAsteroidCircles(svg, data, magnitudeScale) {
    // Filter out unique asteroids from the data array
    const uniqueAsteroids = Array.from(new Set(data.map(d => d.name)));
    const asteroidData = uniqueAsteroids.map(name => {
        return data.find(d => d.name === name);
    });

    // Define circle radius scale based on absolute magnitudes of asteroids
    const circleRadiusScale = d3.scaleLinear()
        .domain([d3.min(asteroidData, d => d.absolute_magnitude_h), d3.max(asteroidData, d => d.absolute_magnitude_h)])
        .range([5, 20]); // Define the range of circle radii based on absolute magnitudes

    const numberOfCircles = asteroidData.length;
// Add label above size scale
svg.append('text')
    .attr('x', -450) // X-coordinate for the label (adjust as needed)
    .attr('y', magnitudeScale.range()[1] - 50) // Y-coordinate for the label (adjust as needed)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('fill', 'white')
    .text('Size Scale:');

    // Log the number of circles to the console
    console.log('Number of circles:', numberOfCircles);

    // Create circles for asteroids
    svg.selectAll('.asteroid-circle')
        .data(asteroidData)
        .enter()
        .append('circle')
        .attr('class', 'asteroid-circle')
        .attr('cx', -450) // X-coordinate for circles (adjust as needed)
        .attr('cy', d => magnitudeScale(d.absolute_magnitude_h) - 20) // Y-coordinate based on magnitudeScale
        .attr('r', d => circleRadiusScale(d.absolute_magnitude_h)) // Radius based on circleRadiusScale
        .attr('fill', d => colorScale(d.name))
        .style('stroke', 'white')
        .attr('opacity', 0.8)
        .append('title')
        .text(d => `Name: ${d.name}\nAbsolute Magnitude: ${d.absolute_magnitude_h}h`);  
        
        
        svg.selectAll('.asteroid-circle')
        .data(asteroidData)
        .enter()
        .append('circle')
        .attr('class', 'asteroid-circle')
        .attr('cx', -450) // X-coordinate for circles (adjust as needed)
        .attr('cy', d => magnitudeScale(d.absolute_magnitude_h) - 20) // Y-coordinate based on magnitudeScale
        .attr('r', d => circleRadiusScale(d.absolute_magnitude_h)) // Radius based on circleRadiusScale
        .attr('fill', d => colorScale(d.name))
        .style('stroke', 'white')
        .attr('opacity', 0.8)
        .append('title')
     .text(d => `Name: ${d.name}\nAbsolute Magnitude: ${d.absolute_magnitude_h}`);

    // Create white Y axis
    const yAxis = svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(-450, 0)`); // Adjust the x-coordinate of the axis as needed

    const yAxisTicks = yAxis.selectAll('.y-tick')
        .data(magnitudeScale.ticks(10)) // Adjust the number of ticks as needed
        .enter()
        .append('g')
        .attr('class', 'y-tick');

    yAxisTicks.append('line')
        .attr('x1', 0)
        .attr('x2', -50) // Length of the tick line
        .attr('y1', d => magnitudeScale(d) - 20) // Adjusted y-coordinate based on magnitudeScale
        .attr('y2', d => magnitudeScale(d) - 20) // Adjusted y-coordinate based on magnitudeScale
        .attr('stroke', 'white')
        .style('stroke-dasharray', '3,3');

    // Optionally, you can add tick labels to the axis
    yAxisTicks.append('text')
        .attr('x', 15) // Distance between tick line and label
        .attr('y', d => magnitudeScale(d) - 20) // Adjusted y-coordinate based on magnitudeScale
        .attr('dy', '0.35em')
        .style('font-size', '15px')
        .style('fill', 'white')
        .text(d => d);
}

// Call the main function to start the process
main();

 

