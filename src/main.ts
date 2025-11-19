// Define the main structure of the application
let mainDiv = document.createElement('div');
mainDiv.innerHTML = `
    <header>
      <h1>Springfield DB</h1>
      <nav>
        <button id="characters-button">Characters</button>
        <button id="episodes-button">Episodes</button>
        <button id="locations-button">Locations</button>
      </nav>
    </header>
    <main>
      <div id="character-list"></div>
      <div id="episode-list"></div>
      <div id="location-list"></div>
    </main>
`;
document.querySelector<HTMLDivElement>('#app')!.appendChild(mainDiv);

// Function to dynamically load modules
const loadModule = async (type: 'characters' | 'episodes' | 'locations') => {
    switch (type) {
        case 'characters':
            await import('./characters.ts');
            break;
        case 'episodes':
            await import('./episodes.ts');
            break;
        case 'locations':
            await import('./locations.ts');
            break;
    }
};

// Preload characters module on initial load
await loadModule('characters');

// Event listeners for navigation buttons
document.querySelector<HTMLButtonElement>('#characters-button')!.addEventListener('click', async () => {
    await loadModule('characters');

    // Show character section
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'block';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'none';
});

document.querySelector<HTMLButtonElement>('#episodes-button')!.addEventListener('click', async () => {
    await loadModule('episodes');

    // Show episode section
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'block';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'none';
});

document.querySelector<HTMLButtonElement>('#locations-button')!.addEventListener('click', async () => {
    await loadModule('locations');

    // Show location section
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'block';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'none';
});