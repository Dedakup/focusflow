// ../assets/sounds.js

// Importing sound files
import rainSound from './sounds/rain-in-forest-birds-nature.mp3';
import windSound from './sounds/singing-birds-nature-atmo.mp3';
import fireplaceSound from './sounds/soft-rain-ambient.mp3';
import birdsSound from './sounds/birds.mp3';
import cafeNoiseSound from './sounds/cafe-noise.mp3';
import cicadasSound from './sounds/cicadas.mp3';
import citySound from './sounds/city.mp3';
import fireSound from './sounds/fire.mp3';
import keyboardSound from './sounds/keyboard.mp3';
import lightRainSound from './sounds/light-rain.mp3';
import morningBirdsSound from './sounds/morning-birds.mp3';
import rainAndThunderSound from './sounds/rain-and-thunder.mp3';

// Data structure for ambient sounds
const sounds = [
    { id: 'rain', label: 'Rain', src: rainSound },
    { id: 'wind', label: 'Wind', src: windSound },
    { id: 'fireplace', label: 'Fireplace', src: fireplaceSound },
    { id: 'birds', label: 'Birds', src: birdsSound },
    { id: 'cafe-noise', label: 'Cafe Noise', src: cafeNoiseSound },
    { id: 'cicadas', label: 'Cicadas', src: cicadasSound },
    { id: 'city', label: 'City', src: citySound },
    { id: 'fire', label: 'Fire', src: fireSound },
    { id: 'keyboard', label: 'Keyboard', src: keyboardSound },
    { id: 'light-rain', label: 'Light Rain', src: lightRainSound },
    { id: 'morning-birds', label: 'Morning Birds', src: morningBirdsSound },
    { id: 'rain-and-thunder', label: 'Rain and Thunder', src: rainAndThunderSound },
    // Add additional sounds here...
];

// Initialize the ambient sounds data with default volume
export const ambientSoundsData = sounds.map(sound => ({ ...sound, volume: 0 }));
