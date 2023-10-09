

  let urlll ="https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-08-07&end_date=2022-08-14&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA";
  
  async function fectchDataInteractive() {   
   
      try {
        let response = await fetch(urlll);
       
  
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
        let asteroidData = await fectchDataInteractive();
        // Process the data as needed
        //console.log(asteroidData);
      
      } catch (error) {
        // Handle any errors that occurred during the data retrieval
        console.error('Data retrieval error:', error);
      }
    }
    
    // Call the main function to start the process
    main();
    
  
  