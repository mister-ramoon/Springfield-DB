import './style.css';

// Define the main structure of the application
let mainDiv = document.createElement('div');
mainDiv.innerHTML = `
    <header class="app-header">
      <h1 class="app-title">Springfield DB</h1>
      <nav class="app-nav">
        <button class="app-button" id="characters-button">Characters</button>
        <button class="app-button" id="episodes-button">Episodes</button>
        <button class="app-button" id="locations-button">Locations</button>
      </nav>
    </header>
    <main class="app-main">
      <div id="character-list" class="app-section"></div>
      <div id="episode-list" class="app-section"></div>
      <div id="location-list" class="app-section"></div>
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
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'grid';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'none';

    // Active Button
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.remove('button-active');
});

document.querySelector<HTMLButtonElement>('#episodes-button')!.addEventListener('click', async () => {
    await loadModule('episodes');

    // Show episode section
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'grid';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'none';

    // Active Button
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.remove('button-active');
});

document.querySelector<HTMLButtonElement>('#locations-button')!.addEventListener('click', async () => {
    await loadModule('locations');

    // Show location section
    document.querySelector<HTMLDivElement>('#location-list')!.style.display = 'grid';

    // Clear other sections
    document.querySelector<HTMLDivElement>('#character-list')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#episode-list')!.style.display = 'none';

    // Active Button
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.remove('button-active');
});