let url ="https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-07&end_date=2023-08-08&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA";

async function fetchAstData() {
    try {
      let response = await fetch(url);
  
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
  
