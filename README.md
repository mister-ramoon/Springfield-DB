# Springfield DB

A modern web application built with TypeScript and Vite that displays information about characters, episodes, and locations from The Simpsons universe using [The Simpsons API](https://thesimpsonsapi.com/).

## Features

- **Character Browser**: Browse through all The Simpsons characters with detailed information including age, occupation, status, and memorable phrases
- **Episode Guide**: Explore episodes with season information, air dates, and synopses
- **Location Directory**: Discover iconic locations from Springfield with images and descriptions
- **Pagination**: Navigate through large datasets with intuitive pagination controls
- **Smooth Transitions**: Enjoy fluid animations and transitions between sections
- **Responsive Design**: Optimized for all device sizes
- **Lazy Loading**: Modules are dynamically loaded for better performance

## Tech Stack

- **TypeScript**: Type-safe JavaScript for better code quality
- **Vite**: Fast build tool and development server
- **The Simpsons API**: RESTful API providing Simpsons data
- **CSS3**: Modern styling with custom animations
- **Google Fonts**: Custom typography (Gochi Hand & Poppins)

## Project Structure

```
springfield-db/
├── index.html          # Main HTML entry point
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── public/             # Static assets
└── src/
    ├── main.ts         # Application entry point and navigation
    ├── characters.ts   # Character data fetching and rendering
    ├── episodes.ts     # Episode data fetching and rendering
    ├── locations.ts    # Location data fetching and rendering
    └── style.css       # Application styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd springfield-db
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Create a production build:
```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## API Integration

This project uses [The Simpsons API](https://thesimpsonsapi.com/) to fetch data:

- **Characters**: `https://thesimpsonsapi.com/api/characters?page={page}`
- **Episodes**: `https://thesimpsonsapi.com/api/episodes?page={page}`
- **Locations**: `https://thesimpsonsapi.com/api/locations?page={page}`

## Features in Detail

### Dynamic Module Loading
The application uses dynamic imports to load modules on demand, reducing initial load time and improving performance.

### Pagination System
Each section (characters, episodes, locations) includes a robust pagination system that:
- Displays the current page number
- Allows navigation to next/previous pages
- Disables buttons when at the first or last page
- Updates the URL to reflect the current page

### Loading States
Each section displays a loading spinner while fetching data from the API, providing better user feedback.

### Error Handling
The application gracefully handles API errors and logs them to the console for debugging.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is private and for educational/portfolio purposes.

## Credits

- Developed by Ramón Ruiz
- Data provided by [The Simpsons API](https://thesimpsonsapi.com/)
- The Simpsons is a trademark of 20th Century Fox

## Acknowledgments

Special thanks to:
- The Simpsons API team for providing free access to comprehensive Simpsons data
- The Vite team for creating an excellent build tool
- The TypeScript team for making JavaScript development more robust
