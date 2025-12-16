// Type Definitions
interface episodesResponse {
    results: Episode[];
}

interface Episode {
    id: number;
    airdate: string;
    episode_number: number;
    image_path: string;
    name: string;
    season: number;
    synopsis: string;
}

// Variable to hold fetched episode data
let episodes: episodesResponse | undefined

// Function to fetch episode data from the API
const getEpisodes = async () => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/episodes`)

    // Parse the JSON response
    episodes = await response.json()
  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch episode data')
  }
}

// Fetch episode data when the script runs
await getEpisodes()

// Render episode data to the DOM
episodes?.results?.map((episode) => {
  // Create a div element for each episode
  const episodeDiv = document.createElement('div')

  // Add section-card class for styling
  episodeDiv.classList.add('section-card');

  // Set the inner HTML of the episode div
  episodeDiv.innerHTML = `
    <h2 class="section-card-title">${episode.name}</h2>
    <p  class="section-card-text"><strong>Season:</strong> S${episode.season} E${episode.episode_number}</p>
    <img src="https://cdn.thesimpsonsapi.com/500${episode.image_path}" alt="${episode.name}" />
  `

  // Add event listener for episode selection
  episodeDiv.addEventListener('click', async () => {
    await selectEpisode(episode.id);
  });

  document.querySelector<HTMLDivElement>('#episode-list')!.appendChild(episodeDiv)
})

// Variable to select an episode
let selectedEpisode: Episode | undefined = undefined;

// Create modal elements for episode details
const createModal = () => {
  const modal = document.createElement('div');
  modal.id = 'episode-modal';
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-body">
        <div class="modal-info">
          <h2 id="episode-modal-name" class="modal-title"></h2>
          <div class="modal-image-container">
            <img id="episode-modal-image" src="" alt="" class="modal-image" />
          </div>
          <div class="modal-details">
            <div class="modal-detail-item">
              <span class="modal-label">Episode Number:</span>
              <span id="episode-modal-episode-number" class="modal-value"></span>
            </div>
            <div class="modal-detail-item"></div>
              <span class="modal-label">Season:</span>
              <span id="episode-modal-season" class="modal-value"></span>
            </div>
          </div>
          <div class="modal-description">
            <h3 class="modal-subtitle">Synopsis</h3>
            <p id="episode-modal-synopsis" class="modal-text"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to body
  document.body.appendChild(modal);

  // Close modal on overlay click
  modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
  
  // Close modal on close button click
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
  
  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
      closeModal();
    }
  });
}

// Function to open modal
const openModal = () => {
  const modal = document.getElementById('episode-modal');
  if (modal) {
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }
};

// Function to close modal
const closeModal = () => {
  const modal = document.getElementById('episode-modal');
  if (modal) {
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
};

// Function to populate modal with episode data
const populateModal = (episode: Episode) => {
  document.getElementById('episode-modal-image')?.setAttribute('src', `https://cdn.thesimpsonsapi.com/500${episode.image_path}`);
  document.getElementById('episode-modal-image')?.setAttribute('alt', episode.name);
  
  const modalName = document.getElementById('episode-modal-name');
  if (modalName) modalName.textContent = episode?.name;

  const modalEpisodeNumber = document.getElementById('episode-modal-episode-number');
  if (modalEpisodeNumber) modalEpisodeNumber.textContent = `E${episode?.episode_number}`;

  const modalSeason = document.getElementById('episode-modal-season');
  if (modalSeason) modalSeason.textContent = `Season ${episode?.season}`;

  const modalAirdate = document.getElementById('episode-modal-airdate');
  if (modalAirdate) modalAirdate.textContent = episode?.airdate ?? 'N/A';

  const modalSynopsis = document.getElementById('episode-modal-synopsis');
  if (modalSynopsis) modalSynopsis.textContent = episode?.synopsis ?? 'N/A';
};



// Function to handle episode selection
const selectEpisode = async (episodeId: number) => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/episodes/${episodeId}`)

    // Parse the JSON response
    selectedEpisode = await response.json()

    if (!selectedEpisode) return;

    // If modal doesn't exist, create it
    if (!document.getElementById('episode-modal')) {
      createModal();
    }

    // Populate and open modal
    populateModal(selectedEpisode);
    
    // Open the modal
    openModal();

  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to select episode');
  }
}