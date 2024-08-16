import path from 'path';
import { fileURLToPath } from 'url';

// Определение __dirname для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backgrounds = [
    {
        name: 'Tiny Camp Fire',
        src: path.join(__dirname, 'videos/Tiny-Camp-Fire.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Tiny-Camp-Fire.jpg'),
    },
    {
        name: 'Apartment Night Rain',
        src: path.join(__dirname, 'videos/apartment-night-rain.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/apartment-night-rain.jpg'),
    },
    {
        name: 'Study Room Sun Shower',
        src: path.join(__dirname, 'videos/Study-Room-Sun-Shower.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Study-Room-Sun-Shower.jpg'),
    },
    {
        name: '90s Office',
        src: path.join(__dirname, 'videos/90s-Office.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/90-office.jpg'),
    },
    {
        name: 'Astronaut Facing a Black Hole',
        src: path.join(__dirname, 'videos/Astronaut-Facing-a-Black-Hole.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Astronaut-Facing-a-Black-Hole.jpg'),
    },
    {
        name: 'Bart Nirvana',
        src: path.join(__dirname, 'videos/Bart-Nirvana.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Bart-Nirvana.jpg'),
    },
    {
        name: 'Bedroom in Space',
        src: path.join(__dirname, 'videos/Bedroom-in-Space.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Bedroom-in-Space.jpg'),
    },
    {
        name: 'Bedroom with Fireplace',
        src: path.join(__dirname, 'videos/Bedroom-with-Fireplace.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Bedroom-with-Fireplace.jpg'),
    },
    {
        name: 'Empty Classroom',
        src: path.join(__dirname, 'videos/Empty-Classroom.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Empty-Classroom.jpg'),
    },
    {
        name: 'Futuristic Room Apartment',
        src: path.join(__dirname, 'videos/Futuristic-Room-Apartment.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Futuristic-Room-Apartment.jpg'),
    },
    {
        name: 'Hacker Desk',
        src: path.join(__dirname, 'videos/Hacker-Desk.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Hacker-Desk.jpg'),
    },
    {
        name: 'Home Office',
        src: path.join(__dirname, 'videos/Home-Office.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Home-Office.jpg'),
    },
    {
        name: 'Japanese Autumn Leaves',
        src: path.join(__dirname, 'videos/Japanese-Autumn-Leaves.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Japanese-Autumn-Leaves.jpg'),
    },
    {
        name: 'Japanese Living Room Night',
        src: path.join(__dirname, 'videos/Japanese-Living-Room-night.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Japanese-Living-Room-night.jpg'),
    },
    {
        name: 'Japanese Living Room',
        src: path.join(__dirname, 'videos/Japanese-Living-Room.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Japanese-Living-Room.jpg'),
    },
    {
        name: 'Living Room Chill',
        src: path.join(__dirname, 'videos/Living-Room-Chill.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Living-Room-Chill.jpg'),
    },
    {
        name: 'Modern Apartment Short',
        src: path.join(__dirname, 'videos/Modern-Apartment-short.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Modern-Apartment-short.jpg'),
    },
    {
        name: 'Neon City Sunrise',
        src: path.join(__dirname, 'videos/Neon-City-Sunrise.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Neon-City-Sunrise.jpg'),
    },
    {
        name: 'Night Drive',
        src: path.join(__dirname, 'videos/Night-Drive.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Night-Drive.jpg'),
    },
    {
        name: 'Night Study Time',
        src: path.join(__dirname, 'videos/Night-Study-Time.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Night-Study-Time.jpg'),
    },
    {
        name: 'Pixel Night',
        src: path.join(__dirname, 'videos/Pixel-Night.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Pixel-Night.jpg'),
    },
    {
        name: 'Pixel Room',
        src: path.join(__dirname, 'videos/Pixel-Room.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Pixel-Room.jpg'),
    },
    {
        name: 'Raining Outside',
        src: path.join(__dirname, 'videos/Raining-Outside.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Raining-Outside.jpg'),
    },
    {
        name: 'Raining',
        src: path.join(__dirname, 'videos/Raining.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Raining.jpg'),
    },
    {
        name: 'Rainy Night Corner Store',
        src: path.join(__dirname, 'videos/Rainy-Night-Corner-Store.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Rainy-Night-Corner-Store.jpg'),
    },
    {
        name: 'Retro Neon Car',
        src: path.join(__dirname, 'videos/Retro-Neon-Car.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Retro-Neon-Car.jpg'),
    },
    {
        name: 'Room in Space Earth',
        src: path.join(__dirname, 'videos/Room-in-Space-earth.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Room-in-Space-earth.jpg'),
    },
    {
        name: 'Space Apartment',
        src: path.join(__dirname, 'videos/Space-Apartment.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Space-Apartment.jpg'),
    },
    {
        name: 'Space Bedroom',
        src: path.join(__dirname, 'videos/Space-Bedroom.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Space-Bedroom.jpg'),
    },
    {
        name: 'Spacecraft Cockpit',
        src: path.join(__dirname, 'videos/Spacecraft-Cockpit.mp4'),
        thumbnailSrc: path.join(__dirname, 'videos/thumbnails/Spacecraft-Cockpit.jpg'),
    },
];

export default backgrounds;
