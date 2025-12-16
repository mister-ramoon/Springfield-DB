// Type Definitions
interface LocationsResponse {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
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
let currentPage = 1;

// Function to show loading spinner
const showLoading = () => {
  const locationList = document.querySelector<HTMLDivElement>('#location-list');
  if (!locationList) return;
  locationList.innerHTML = '<div class="loading-container"><div class="spinner"></div></div>';
};

// Function to fetch location data from the API
const getLocations = async (page: number = 1) => {
  // Show loading indicator
  showLoading();
  
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`)

    // Parse the JSON response
    locations = await response.json()
    
    // Render locations
    renderLocations();
    
    // Update pagination controls
    updatePaginationControls();
  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch location data')
  }
}

// Function to render locations
const renderLocations = () => {
  const locationList = document.querySelector<HTMLDivElement>('#location-list');
  if (!locationList) return;
  
  // Clear existing locations
  locationList.innerHTML = '';
  
  // Render location data to the DOM
  locations?.results?.forEach((location) => {
    const locationDiv = document.createElement('div')
    locationDiv.classList.add('section-card');
    locationDiv.innerHTML = `
      <h2 class="section-card-title">${location.name}</h2>
      <img src="https://cdn.thesimpsonsapi.com/500${location.image_path}" alt="${location.name}" width="500" height="281" loading="lazy" decoding="async" />
    `
    locationList.appendChild(locationDiv);
  });
};

// Function to create pagination controls
const createPaginationControls = () => {
  // Check if pagination already exists
  if (document.getElementById('location-pagination')) return;
  
  const paginationDiv = document.createElement('div');
  paginationDiv.id = 'location-pagination';
  paginationDiv.className = 'pagination';
  paginationDiv.innerHTML = `
    <button id="location-prev-page" class="pagination-btn">Previous</button>
    <span id="location-page-info" class="page-info"></span>
    <button id="location-next-page" class="pagination-btn">Next</button>
  `;
  
  const paginationContainer = document.querySelector('#location-pagination-container');
  paginationContainer?.appendChild(paginationDiv);
  
  // Add event listeners
  document.getElementById('location-prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      getLocations(currentPage);
    }
  });
  
  document.getElementById('location-next-page')?.addEventListener('click', () => {
    if (locations && currentPage < locations.pages) {
      currentPage++;
      getLocations(currentPage);
    }
  });
};

// Function to update pagination controls
const updatePaginationControls = () => {
  const prevBtn = document.getElementById('location-prev-page') as HTMLButtonElement;
  const nextBtn = document.getElementById('location-next-page') as HTMLButtonElement;
  const pageInfo = document.getElementById('location-page-info');
  
  if (prevBtn) prevBtn.disabled = !locations?.prev;
  if (nextBtn) nextBtn.disabled = !locations?.next;
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${locations?.pages ?? 0}`;
};

// Fetch location data when the script runs
await getLocations(currentPage);

// Create pagination controls
createPaginationControls();

// Update pagination controls initially
updatePaginationControls();