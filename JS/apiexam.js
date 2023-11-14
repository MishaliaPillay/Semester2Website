let pageNumberSlider = document.getElementById('pageNumberSlider');
let pageNumberText = document.getElementById('pageNumber');
let loadingMessage = document.getElementById('loadingTextthrees');
let currentPageNumber = 0; // Variable to store the current page number
let debounceTimeout;
let sliderTimeout;

pageNumberSlider.addEventListener('input', function () {
    let pageNumber = pageNumberSlider.value;
    pageNumberText.textContent = `Page: ${pageNumber}`;

    // Update the current page number
    currentPageNumber = parseInt(pageNumber);

    // Clear previous debounce timeout
    clearTimeout(debounceTimeout);
    
    // Set a timeout to trigger the API request after 5 seconds of slider inactivity
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
        debounceTimeout = setTimeout(async () => {
            try {
                let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${currentPageNumber}&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA`;
                let asteroidData = await fetchAstData2(url);
                // Process the data as needed
                console.log(asteroidData);
                updateGraph(asteroidData);
                // Update the UI with the fetched data
                updateUI(asteroidData);
            } catch (error) {
                console.error('Error fetching or updating UI:', error);
            }
        }, 500); // Adjust the delay time as needed
    }, 5000); // 5 seconds delay for slider inactivity
});

async function fetchAstData2(url) {
    loadingMessage.style.display = 'block';
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
        throw error; // Re-throw the error for the caller to handle
    }
}

function updateUI(data) {
    // Add your DOM manipulation code here to update the UI with the fetched data
    // For example, you can display asteroid information in a list, etc.
    console.log('Updating UI with data:', data);
}

async function main() {
    try {
        // Initial fetch with page 0
        let initialData = await fetchAstData2("https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&api_key=8Vtxr88AbUfI12VOV2uXnn06djnja0v4eLhGN1sA");
        // Process the data as needed
        console.log(initialData);
        // Update the UI with the initial data
        updateGraph(initialData);
        updateUI(initialData);
        
    } catch (error) {
        // Handle any errors that occurred during the data retrieval
        console.error('Data retrieval error:', error);
    }
}

// Call the main function to start the process
main();