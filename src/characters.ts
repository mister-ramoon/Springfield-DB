// Type Definitions
interface CharacterResponse {
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
}

// Variable to hold fetched character data
let characters: CharacterResponse | undefined

// Function to fetch character data from the API
const getCharacters = async () => {
  try {
    // Fetch data from The Simpsons API
    let response = await fetch(`https://thesimpsonsapi.com/api/characters`)

    // Parse the JSON response
    characters = await response.json()
  } catch {
    // Log an error message if the fetch fails
    console.error('Failed to fetch character data')
  }
}

// Fetch character data when the script runs
await getCharacters()

// Render character data to the DOM
characters?.results?.map((character) => {
  const characterDiv = document.createElement('div')
  characterDiv.innerHTML = `
  <div class="section-card">
  <h2 class="section-card-title">${character.name}</h2>
  <img class="section-card-image" src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" alt="${character.name}" />
  </div>
  `
  document.querySelector<HTMLDivElement>('#character-list')!.appendChild(characterDiv)
})
