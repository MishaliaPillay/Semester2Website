let url ="https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA";
let loadingMessageet = document.getElementById('loadingTextthree');
async function fetchAstData2() {      loadingMessageet.style.display = 'block';
    try {
      let response = await fetch(url);
      loadingMessageet.style.display = 'none';

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
      let asteroidData = await fetchAstData2();
      // Process the data as needed
      console.log(asteroidData);
      
      //console.log(asteroidData.close_approach_data[100]);
      
    } catch (error) {
      // Handle any errors that occurred during the data retrieval
      console.error('Data retrieval error:', error);
    }
  }
  
  // Call the main function to start the process
  main();
  