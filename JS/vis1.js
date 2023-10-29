




//DIMENSIONS

const widthh = window.innerWidth/2;
const heightt = window.innerHeight/2;
let
marginn=80;




async function createScatterPlot() {
  try {
    let asteroidData = await fetchAstData();

    // Select the SVG container element
    let svg = d3.select('#roott')
      .append('svg')
      .style("background-color", '#00a0a949')
      .attr('height',heightt+ marginn +marginn)
      .attr("width", widthh+ marginn +marginn )
      .append('g')
      .attr("transform",  `translate(${marginn}, ${marginn})`);
     // near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date
    // Parse dates and miss distances\


    let dates = Object.keys(asteroidData.near_earth_objects); 
    
    // Initialize an empty array to store parsed data for all dates
    let parsedData = [];
    dates.forEach((date) => {
      // Iterate through asteroids for the current date
      asteroidData.near_earth_objects[date].forEach((asteroid) => {
        let closestApproach = asteroid.close_approach_data[0];
        let dataForDate = {


          date: new Date(closestApproach.close_approach_date)
          
          
          ,
          missDistance: parseFloat(closestApproach.miss_distance.kilometers),size: parseFloat(asteroid.absolute_magnitude_h),
      isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)
        };

        // Push the parsed data for the current asteroid to the 'parsedData' array
        parsedData.push(dataForDate);
      });
    });

  
    // Set up scales
    let xScale = d3.scaleTime()
      .domain([d3.min(parsedData, d => d.date), d3.max(parsedData, d => d.date)])
      .range([0, widthh-50]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.missDistance)])
      .range([heightt-50, 0]);
      let rScale =d3.scaleSqrt().domain([d3.min(parsedData, d => d.size), d3.max(parsedData, d => d.size)]).range([1,30])
    
      let colorScale = d3.scaleOrdinal()
    .domain([true, false]) 
    .range(['red', 'gray']); 

     
    //  circles 
    svg.selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
   
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.missDistance))
      .attr('r', d => rScale(d.size))
      .style("stroke", "#000")
      .style('fill', d => colorScale(d.isHazardous))
      .style("opacity", "0.7")
      .on("mouseover", (event,datum)=>showTooltipp(datum))
      .on('mousemove',moveTooltipp)    
      .on("mouseout", hideTooltipp)
          ; 


    // Add X and Y axes
    let createYAxis= 
      svg.append('g').style("color", "white")   .style("font-size", "10px").call(d3.axisLeft(yScale))
      .call((g)=> {
          g.append("text")
        
          .attr("x", "-5%")
          .attr("y", "-10%")
          .attr('transform', 'rotate(-90)')
          .style("fill", "white")
          .attr("padding", "40px")
          .style("font-size",  "150%")
          .text("Miss Distance between the Asteroids and Earth");
      });
  


  let createXAxis=
    svg
    .append('g').style("color", "white") .style("font-size", "10px")
    .attr('transform', `translate(0, ${heightt})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d')).ticks(8))
    //method below  call takens in a fucntion as an arguement runs a fucntion on a selection 
    .call((g) => {
        g.append("text")
        .attr("x", widthh/2)
        .attr("y", +45)
        .style("fill", "white").style("fill", "white")
        .style("font-size","150%")
        .text("The Dates for the recordings of Asteroid Data");})
  
   // let xAxis = d3.axisBottom(xScale));
    //let yAxis = d3.axisLeft(yScale);

    svg.append('g').append("text")
      .attr('transform', `translate(0, ${heightt})`)
      .call(createXAxis);

    svg.append('g')
      .call(createYAxis);
  } catch (error) {
    console.error('Error:', error);
  }
}
 
/*xScale.select(".axisc").attr("stroke","#E04836")
.attr("stroke-width","6")
.attr("opacity",".6");*/

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

function showTooltipp(d){
  tooltipp.transition().duration(200)
  .style('opacity', 1)
  .style('left', d3.pointer(event)[0] + 100 + "px")
  .style('top', d3.pointer(event) [1] + 100 + "px")
   //console.log("working ")
   tooltipp.html("Distance :  " + d.missDistance.toFixed(0) +" km  " +"Size:  " + d.size.toFixed(0) +" h")
};
function moveTooltipp(){
  tooltipp.style('left', d3.pointer(event)[0] +100 +'px')
  .style('top',d3.pointer(event)[1]+ 100 +'px')
}
function hideTooltipp(){
  tooltipp.style('opacity',0);
}
// Call the function to create the scatter plot
createScatterPlot();
