




//DIMENSIONS
let heightt =800,
widthh=700,
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
/*
    function DateGenerator()
    {
        let date="\"2023-08-";
    
        let datestring=[]
        let day =7;
        for(let i=0; i<8; i++)
        {
        
            if(day<10)
            {
                date+="0"+day.toString()+"\"";
            }else{
                date+=day.toString()+"\"";
            }
        
            datestring.push(date)
            date="\"2023-08-"
            day++;
        }
    }
    DateGenerator();
    
    for(let i=0; i<7; i++){
        let parsedData = asteroidData.near_earth_objects[datestring[i]].map((asteroid) => {
            let closestApproach = asteroid.close_approach_data[0];
            //let closestApproach = asteroidData.near_earth_objects["2023-08-07"][length ++].close_approach_data[0];
            return {
              date: new Date(closestApproach.close_approach_date),
              missDistance: parseFloat(closestApproach.miss_distance.kilometers),
              size: parseFloat(asteroid.absolute_magnitude_h),
              isHazardous: Boolean(asteroid.is_potentially_hazardous_asteroid)
            };
          });
    }
   */

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
    /*dates.forEach((date) => {
      // Iterate through asteroids for the current date
      asteroidData.near_earth_objects[date].forEach((asteroid) => {
        let closestApproach = asteroid.close_approach_data[0];
        let dataForDate = {
          date: new Date(closestApproach.close_approach_date),
          missDistance: parseFloat(closestApproach.miss_distance.astronomical),
        };

        // Push the parsed data for the current asteroid to the 'parsedData' array
        parsedData.push(dataForDate);
      });*//*
console.log(dates);
  let parsedData2 = asteroidData.near_earth_objects;
    console.log(parsedData2);
  
 let parsedData = asteroidData.near_earth_objects["2023-08-07"].map((asteroid) => {
      let closestApproach = asteroid.close_approach_data[0];
      //let closestApproach = asteroidData.near_earth_objects["2023-08-07"][length ++].close_approach_data[0];
      return {
        date: new Date(closestApproach.close_approach_date),
        missDistance: parseFloat(closestApproach.miss_distance.kilometers),
        
      };
    });*/
  
    // Set up scales
    let xScale = d3.scaleTime()
      .domain([d3.min(parsedData, d => d.date), d3.max(parsedData, d => d.date)])
      .range([40, widthh]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.missDistance)])
      .range([heightt, 0]);
      let rScale =d3.scaleSqrt().domain([d3.min(parsedData, d => d.size), d3.max(parsedData, d => d.size)]).range([1,30])
    
      let colorScale = d3.scaleOrdinal()
    .domain([true, false]) 
    .range(['red', 'teal']); 
    
    //  circles 
    svg.selectAll('circle')
      .data(parsedData)
      .enter()
      .append('circle')
   
      .attr('cx', d => xScale(d.date)-10)
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
    .attr('transform', `translate(0, ${heightt})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d')).ticks(8))
    //method below  call takens in a fucntion as an arguement runs a fucntion on a selection 
    .call((g) => {
        g.append("text")
        .attr("x", widthh/2)
        .attr("y", +35)
        .style("fill", "white")
        .style("font-size", "20px")
        .text("Dates");})
  
   // let xAxis = d3.axisBottom(xScale));
    //let yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${heightt})`)
      .call(createXAxis);

    svg.append('g')
      .call(createYAxis);
  } catch (error) {
    console.error('Error:', error);
  }
}

let tooltipp = d3.select('#roott')
.append('div')
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
   console.log("working ")
   tooltipp.html("Distance :  " + d.missDistance +" km  " +"Size:  " + d.size +" h")
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