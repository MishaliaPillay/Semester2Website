//date change 
/*
let today = new Date();
let date =today;
let nextWeek =new Date();
console.log(today);
nextWeek = date.getDate() + 5;
console.log(today);
console.log(nextWeek);
let day = d3.utcDay(today);
console.log(day);
*/
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;}
  console.log(addDays);
/*let dateFormat = today.getFullYear() + "-" +((today.getMonth()+1).length != 2 ? "0" + (today.getMonth() + 1) : (today.getMonth()+1)) + "-" + (today.getDate().length != 2 ?"0" + today.getDate() : today.getDate());
console.log(dateFormat);*/

//regular stuff
let url ="https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-07&end_date=2023-08-14&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA";
let loadingMessage = document.getElementById('loadingText');
async function fetchAstData() {    loadingMessage.style.display = 'block';
    try {
      let response = await fetch(url);
      loadingMessage.style.display = 'none';

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let data = await response.json();
      return data;
    } catch (error) { 
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    }
  }
  
  async function main() {
    try {
      let asteroidData = await fetchAstData();
      // Process the data as needed
      console.log(asteroidData);
    console.log(asteroidData.near_earth_objects["2023-08-07"][0].close_approach_data[0].close_approach_date);
console.log(asteroidData.near_earth_objects["2023-08-07"][0].close_approach_data[0].miss_distance["kilometers"]);
        ;
    } catch (error) {
      // Handle any errors that occurred during the data retrieval
      console.error('Data retrieval error:', error);
    }
  }
  
  // Call the main function to start the process
  main();
  

