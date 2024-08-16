import path from 'path';
import { fileURLToPath } from 'url';

// Определение __dirname для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sounds = [
    { id: 'rain', label: 'Rain', src: path.join(__dirname, 'sounds', 'rain-in-forest-birds-nature.mp3') },
    { id: 'wind', label: 'Wind', src: path.join(__dirname, 'sounds', 'singing-birds-nature-atmo.mp3') },
    { id: 'fireplace', label: 'Fireplace', src: path.join(__dirname, 'sounds', 'soft-rain-ambient.mp3') },
    { id: 'birds', label: 'Birds', src: path.join(__dirname, 'sounds', 'birds.mp3') },
    { id: 'cafe-noise', label: 'Cafe Noise', src: path.join(__dirname, 'sounds', 'cafe-noise.mp3') },
    { id: 'cicadas', label: 'Cicadas', src: path.join(__dirname, 'sounds', 'cicadas.mp3') },
    { id: 'city', label: 'City', src: path.join(__dirname, 'sounds', 'city.mp3') },
    { id: 'fire', label: 'Fire', src: path.join(__dirname, 'sounds', 'fire.mp3') },
    { id: 'keyboard', label: 'Keyboard', src: path.join(__dirname, 'sounds', 'keyboard.mp3') },
    { id: 'light-rain', label: 'Light Rain', src: path.join(__dirname, 'sounds', 'light-rain.mp3') },
    { id: 'morning-birds', label: 'Morning Birds', src: path.join(__dirname, 'sounds', 'morning-birds.mp3') },
    { id: 'rain-and-thunder', label: 'Rain and Thunder', src: path.join(__dirname, 'sounds', 'rain-and-thunder.mp3') },
];

export default sounds;
