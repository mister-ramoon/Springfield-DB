import './style.css';

// Define the main structure of the application
let mainDiv = document.createElement('div');
mainDiv.className = 'app-container';
mainDiv.innerHTML = `
    <header class="app-header">
      <h1 class="app-title">Springfield DB</h1>
      <nav class="app-nav">
        <button class="app-button button-active" id="characters-button">Characters</button>
        <button class="app-button" id="episodes-button">Episodes</button>
        <button class="app-button" id="locations-button">Locations</button>
      </nav>
    </header>
    <main class="app-main">
      <div id="character-section" class="section-container">
        <div id="character-list" class="app-section"></div>
        <div id="character-pagination-container"></div>
      </div>
      <div id="episode-section" class="section-container" style="display: none;">
        <div id="episode-list" class="app-section"></div>
        <div id="episode-pagination-container"></div>
      </div>
      <div id="location-section" class="section-container" style="display: none;">
        <div id="location-list" class="app-section"></div>
        <div id="location-pagination-container"></div>
      </div>
    </main>
    <footer class="app-footer">
      <!-- TODO: add your own portfolio link -->
      <p class="footer-text">Developed by Ramón Ruiz and coffee ☕</p>
    </footer>
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
    // Fade out current section
    const sections = document.querySelectorAll<HTMLDivElement>('.section-container');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await loadModule('characters');

    // Show character section
    const characterSection = document.querySelector<HTMLDivElement>('#character-section')!;
    characterSection.style.display = 'block';

    // Hide other sections
    document.querySelector<HTMLDivElement>('#episode-section')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-section')!.style.display = 'none';

    // Fade in
    setTimeout(() => {
        characterSection.style.opacity = '1';
        characterSection.style.transform = 'translateY(0)';
    }, 50);

    // Active Button
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.remove('button-active');
});

document.querySelector<HTMLButtonElement>('#episodes-button')!.addEventListener('click', async () => {
    // Fade out current section
    const sections = document.querySelectorAll<HTMLDivElement>('.section-container');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await loadModule('episodes');

    // Show episode section
    const episodeSection = document.querySelector<HTMLDivElement>('#episode-section')!;
    episodeSection.style.display = 'block';

    // Hide other sections
    document.querySelector<HTMLDivElement>('#character-section')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#location-section')!.style.display = 'none';

    // Fade in
    setTimeout(() => {
        episodeSection.style.opacity = '1';
        episodeSection.style.transform = 'translateY(0)';
    }, 50);

    // Active Button
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.remove('button-active');
});

document.querySelector<HTMLButtonElement>('#locations-button')!.addEventListener('click', async () => {
    // Fade out current section
    const sections = document.querySelectorAll<HTMLDivElement>('.section-container');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await loadModule('locations');

    // Show location section
    const locationSection = document.querySelector<HTMLDivElement>('#location-section')!;
    locationSection.style.display = 'block';

    // Hide other sections
    document.querySelector<HTMLDivElement>('#character-section')!.style.display = 'none';
    document.querySelector<HTMLDivElement>('#episode-section')!.style.display = 'none';

    // Fade in
    setTimeout(() => {
        locationSection.style.opacity = '1';
        locationSection.style.transform = 'translateY(0)';
    }, 50);

    // Active Button
    document.querySelector<HTMLButtonElement>('#locations-button')!.classList.add('button-active');
    document.querySelector<HTMLButtonElement>('#characters-button')!.classList.remove('button-active');
    document.querySelector<HTMLButtonElement>('#episodes-button')!.classList.remove('button-active');
});