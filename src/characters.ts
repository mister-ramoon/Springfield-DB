// Type Definitions
interface CharacterResponse {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
    results: Character[];
}
interface Character {
    id: number;
    age: number;
    birthdate: string;
    gender: string;
    name: string;
    occupation: string;
    portrait_path: string;
    phrases: string[];
    status: string;
    description?: string;
}

// Variable to hold fetched character data
let characters: CharacterResponse | undefined
let currentPage = 1;

// Function to fetch character data from the API
const getCharacters = async (page: number = 1) => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`)

    // Parse the JSON response
    characters = await response.json()
    
    // Render characters
    renderCharacters();
    
    // Update pagination controls
    updatePaginationControls();
  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch character data')
  }
}

// Function to render characters
const renderCharacters = () => {
  const characterList = document.querySelector<HTMLDivElement>('#character-list');
  if (!characterList) return;
  
  // Clear existing characters
  characterList.innerHTML = '';
  
  // Render character data to the DOM
  characters?.results?.forEach((character) => {
    // Create a div element for each character
    const characterDiv = document.createElement('div')

    // Add section-card class for styling
    characterDiv.classList.add('section-card');

    // Set the inner HTML of the character div
    characterDiv.innerHTML = `
      <h2 class="section-card-title">${character.name}</h2>
      <img src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" alt="${character.name}" />
    `

    // Add event listener for character selection
    characterDiv.addEventListener('click', async () => {
      await selectCharacter(character.id);
    });

    characterList.appendChild(characterDiv);
  });
};

// Function to create pagination controls
const createPaginationControls = () => {
  // Check if pagination already exists
  if (document.getElementById('character-pagination')) return;
  
  const paginationDiv = document.createElement('div');
  paginationDiv.id = 'character-pagination';
  paginationDiv.className = 'pagination';
  paginationDiv.innerHTML = `
    <button id="character-prev-page" class="pagination-btn">Previous</button>
    <span id="character-page-info" class="page-info"></span>
    <button id="character-next-page" class="pagination-btn">Next</button>
  `;
  
  const paginationContainer = document.querySelector('#character-pagination-container');
  paginationContainer?.appendChild(paginationDiv);
  
  // Add event listeners
  document.getElementById('character-prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      getCharacters(currentPage);
    }
  });
  
  document.getElementById('character-next-page')?.addEventListener('click', () => {
    if (characters && currentPage < characters.pages) {
      currentPage++;
      getCharacters(currentPage);
    }
  });
};

// Function to update pagination controls
const updatePaginationControls = () => {
  const prevBtn = document.getElementById('character-prev-page') as HTMLButtonElement;
  const nextBtn = document.getElementById('character-next-page') as HTMLButtonElement;
  const pageInfo = document.getElementById('character-page-info');
  
  if (prevBtn) prevBtn.disabled = !characters?.prev;
  if (nextBtn) nextBtn.disabled = !characters?.next;
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${characters?.pages ?? 0}`;
};

// Fetch character data when the script runs
await getCharacters(currentPage);

// Create pagination controls
createPaginationControls();

// Update pagination controls initially
updatePaginationControls();

// Variable to select a character
let selectedCharacter: Character | undefined

// Create modal for character details
const createModal = () => {
  const modal = document.createElement('div');
  modal.id = 'character-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-body">
        <div class="modal-image-container">
          <img id="modal-image" src="" alt="" class="modal-image" />
        </div>
        <div class="modal-info">
          <h2 id="modal-name" class="modal-title"></h2>
          <div class="modal-details">
            <div class="modal-detail-item">
              <span class="modal-label">Age:</span>
              <span id="modal-age" class="modal-value"></span>
            </div>
            <div class="modal-detail-item">
              <span class="modal-label">Gender:</span>
              <span id="modal-gender" class="modal-value"></span>
            </div>
            <div class="modal-detail-item">
              <span class="modal-label">Occupation:</span>
              <span id="modal-occupation" class="modal-value"></span>
            </div>
            <div class="modal-detail-item">
              <span class="modal-label">Status:</span>
              <span id="modal-status" class="modal-value"></span>
            </div>
            <div class="modal-detail-item">
              <span class="modal-label">Birthdate:</span>
              <span id="modal-birthdate" class="modal-value"></span>
            </div>
          </div>
          <div class="modal-description">
            <h3 class="modal-subtitle">Description</h3>
            <p id="modal-description" class="modal-text"></p>
          </div>
          <div class="modal-phrases">
            <h3 class="modal-subtitle">Famous Phrases</h3>
            <ul id="modal-phrases-list" class="modal-phrases-list"></ul>
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
};

// Function to open modal
const openModal = () => {
  const modal = document.getElementById('character-modal');
  if (modal) {
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }
};

// Function to close modal
const closeModal = () => {
  const modal = document.getElementById('character-modal');
  if (modal) {
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
};

// Function to populate modal with character data
const populateModal = (character: Character) => {
  document.getElementById('modal-image')?.setAttribute('src', `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`);
  document.getElementById('modal-image')?.setAttribute('alt', character.name);
  
  const modalName = document.getElementById('modal-name');
  if (modalName) modalName.textContent =  character?.name;
  
  const modalAge = document.getElementById('modal-age');
  if (modalAge) modalAge.textContent = character?.age?.toString() ?? 'N/A';
  
  const modalGender = document.getElementById('modal-gender');
  if (modalGender) modalGender.textContent = character?.gender;
  
  const modalOccupation = document.getElementById('modal-occupation');
  if (modalOccupation) modalOccupation.textContent = character?.occupation;
  
  const modalStatus = document.getElementById('modal-status');
  if (modalStatus) modalStatus.textContent = character?.status;
  
  const modalBirthdate = document.getElementById('modal-birthdate');
  if (modalBirthdate) modalBirthdate.textContent = character?.birthdate;
  
  const modalDescription = document.getElementById('modal-description');
  if (modalDescription) modalDescription.textContent = character?.description ?? 'N/A';
  
  const phrasesList = document.getElementById('modal-phrases-list');
  if (phrasesList) {
    phrasesList.innerHTML = character?.phrases
      .map(phrase => `<li class="modal-phrase-item">"${phrase}"</li>`)
      .join('');
  }
};

// Function to handle character selection
const selectCharacter = async (characterId: number) => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/characters/${characterId}`);

    // Parse character data
    selectedCharacter = await response.json();
    
    if (!selectedCharacter) return;
    
    // Create modal if it doesn't exist
    if (!document.getElementById('character-modal')) {
      createModal();
    }
    
    // Populate and open modal
    populateModal(selectedCharacter);
    
    // Open the modal
    openModal();

  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch character data');
  }
};