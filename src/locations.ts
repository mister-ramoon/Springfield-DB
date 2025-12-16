// Type Definitions
interface LocationsResponse {
    results: Location[];
}

interface Location {
    id: number;
    name: string;
    image_path: string;
    town: string;
    use: string;
}

// Variable to hold fetched location data
let locations: LocationsResponse | undefined

// Function to fetch location data from the API
const getLocations = async () => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/locations`)

    // Parse the JSON response
    locations = await response.json()
  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch location data')
  }
}

// Fetch location data when the script runs
await getLocations()

// Render location data to the DOM
locations?.results?.map((location) => {
  const locationDiv = document.createElement('div')
  locationDiv.classList.add('section-card');
  locationDiv.innerHTML = `
    <h2 class="section-card-title">${location.name}</h2>
    <img src="https://cdn.thesimpsonsapi.com/500${location.image_path}" alt="${location.name}" />
  `
  document.querySelector<HTMLDivElement>('#location-list')!.appendChild(locationDiv)
})