




//DIMENSIONS
let height =800,
width=900,
margin=80;




async function createScatterPlot() {
  try {
    let asteroidData = await fetchAstData2();

    // Select the SVG container element
    let svg = d3.select('#root')
      .append('svg').style("background-color", '#00a0a949')
      .attr('height',height+ margin +margin)
      .attr("width", width+ margin +margin )
      .append('g')
      .attr("transform",  `translate(${margin}, ${margin})`);
     // near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date

   let orbitArray=[];

for(let i=0; i<100; i++)
{
    orbitArray.push(asteroidData.close_approach_data[100+i]);
   
}
console.log(orbitArray[0])
console.log(orbitArray[99]);
let parsedData = orbitArray.map((asteroid) => {
  
  //let closestApproach = asteroidData.near_earth_objects["2023-08-07"][length ++].close_approach_data[0];
  return {
    date: new Date(asteroid.close_approach_date),
    missDistance: parseFloat(asteroid.miss_distance.kilometers),
    planet: asteroid.orbiting_body
  };
})
console.log(parsedData);
    
  let xScale = d3.scaleBand()
    .domain(['Venus','Earth','Merc'])
    .range([0, width])
   ;

// i need to still see colour change Select the x-axis and change the color of the text
svg.select('.xScale')
  .selectAll()
  .style('fill', 'white'); // Replace 'your-color-here' with the desired color

// Select the y-axis and change the color of the text
svg.select('.yScale')
  .selectAll()
  .style('fill', 'white');

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.missDistance)])
      .range([height, 0]);
     
    
     let colorScale = d3.scaleOrdinal().domain(['Venus','Earth','Merc']).range(d3.schemePaired)
    //  circles 
    svg.selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('cx',d=>xScale(d.planet)+150)
      .attr('cy', d => yScale(d.missDistance))
      .attr('r', '10')
      .style("stroke", "#000")
      .style('fill',(d)=> colorScale(d.planet))
      .style("opacity", "0.7")
      .on("mouseover", (event,datum)=>showTooltip(datum))
      .on('mousemove',moveTooltip)    
      .on("mouseout", hideTooltip)
          ; 

    // Add X and Y axes
  
  let createYAxis= 
      svg.append('g').call(d3.axisLeft(yScale))
      .call((g)=> {
          g.append("text")
          .attr("x", -300)
          .attr("y", -65)
          .attr('transform', 'rotate(-90)')
          .style("fill", "white")
          .style("font-size", "20px")
          .text("Miss Distance");
      });
  
  let createXAxis=
    svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(2))
    //method below  call takens in a fucntion as an arguement runs a fucntion on a selection 
    .call((g) => {
        g.append("text")
        .attr("x", width/2)
        .attr("y", +35)
        .style("fill", "white")
        .style("font-size", "20px")
        .text("Planet");})
  


    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(createXAxis);

    svg.append('g')
      .call(createYAxis);
  } catch (error) {
    console.error('Error:', error);
  }
}

let tooltip = d3.select('#root')
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

function showTooltip(d){
  tooltip.transition().duration(200)
  .style('opacity', 1)
  .style('left', d3.pointer(event)[0] + 100 + "px")
  .style('top', d3.pointer(event) [1] + 100 + "px")
   console.log("working ")
   tooltip.html("Distance :  " + d.missDistance +" km  ")
};
function moveTooltip(){
  tooltip.style('left', d3.pointer(event)[0] +100 +'px')
  .style('top',d3.pointer(event)[1]+ 100 +'px')
}
function hideTooltip(){
  tooltip.style('opacity',0);
}
// Call the function to create the scatter plot
createScatterPlot();
