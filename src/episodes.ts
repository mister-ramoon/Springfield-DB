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
  const episodeDiv = document.createElement('div')
  episodeDiv.innerHTML = `
    <h2>${episode.name}</h2>
    <img src="https://cdn.thesimpsonsapi.com/500${episode.image_path}" alt="${episode.name}" />
    <p><strong>Season:</strong> ${episode.season}</p>
    <p><strong>Episode Number:</strong> ${episode.episode_number}</p>
    <p><strong>Air Date:</strong> ${episode.airdate}</p>
    <p><strong>Synopsis:</strong> ${episode.synopsis}</p>
    <hr />
  `
  document.querySelector<HTMLDivElement>('#episode-list')!.appendChild(episodeDiv)
})