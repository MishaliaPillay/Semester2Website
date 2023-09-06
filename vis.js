



//DIMENSIONS
let height =600,
width=600,
margin=80;


//CREATE SVG
let svg = d3
.select("section")
.append("svg")
.attr('height',height+ margin +margin)
.attr("width", width+ margin +margin )
.append('g')
.attr("transform",  `translate(${margin}, ${margin})`);


//CREATE AXES
let xScale = d3.scaleLinear().domain([0,10]).range([0,width]);
function createxAxis(data)
{svg .append('g')
.attr("transform",`translate(0,${height})`)
.call(d3.axisBottom(xScale));
}

let ySCale= d3.scaleLinear().domain([0, 91036308.674355668]).range([height,0]);
function createyAxis(){
    svg.append("g").call(d3.axisLeft(ySCale));
}
//CREATE CIRCLES 

function createCirles(data){
    svg.selectAll(".circles")
    .data(data)
    
.enter().append('circle')
        .attr('cx', (d) => xScale(d.near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date
            ))
        .attr('cy', (d) => ySCale(d.near_earth_objects["2023-08-07"][0].close_approach_data[0].miss_distance["kilometers"]))
        .attr('r', 2)
        .style('fill', 'steelblue');
    
}



//IMPLEMENT

d3.json("https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-07&end_date=2023-08-08&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA")
.then(function(data){createxAxis(data);
createyAxis();
createCirles(data);});