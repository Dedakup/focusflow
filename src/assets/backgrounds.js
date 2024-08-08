// src/backgrounds.js

// Importing video files and their respective thumbnails
import apartmentNightRain from './videos/apartment-night-rain.mp4';
import thumbnail1 from './videos/thumbnails/apartment-night-rain.jpg';

import studyRoomSunShower from './videos/Study-Room-Sun-Shower.mp4';
import thumbnail2 from './videos/thumbnails/Study-Room-Sun-Shower.jpg';

import background1 from './videos/90s-Office.mp4';
import thumbnail3 from './videos/thumbnails/90-office.jpg';

import background2 from './videos/Astronaut-Facing-a-Black-Hole.mp4';
import thumbnail4 from './videos/thumbnails/Astronaut-Facing-a-Black-Hole.jpg';

import background3 from './videos/Bart-Nirvana.mp4';
import thumbnail5 from './videos/thumbnails/Bart-Nirvana.jpg';

import background4 from './videos/Bedroom-in-Space.mp4';
import thumbnail6 from './videos/thumbnails/Bedroom-in-Space.jpg';

import background5 from './videos/Bedroom-with-Fireplace.mp4';
import thumbnail7 from './videos/thumbnails/Bedroom-with-Fireplace.jpg';

import background6 from './videos/Empty-Classroom.mp4';
import thumbnail8 from './videos/thumbnails/Empty-Classroom.jpg';

import background7 from './videos/Futuristic-Room-Apartment.mp4';
import thumbnail9 from './videos/thumbnails/Futuristic-Room-Apartment.jpg';

import background8 from './videos/Hacker-Desk.mp4';
import thumbnail10 from './videos/thumbnails/Hacker-Desk.jpg';

import background9 from './videos/Home-Office.mp4';
import thumbnail11 from './videos/thumbnails/Home-Office.jpg';

import background10 from './videos/Japanese-Autumn-Leaves.mp4';
import thumbnail12 from './videos/thumbnails/Japanese-Autumn-Leaves.jpg';

import background11 from './videos/Japanese-Living-Room-night.mp4';
import thumbnail13 from './videos/thumbnails/Japanese-Living-Room-night.jpg';

import background12 from './videos/Japanese-Living-Room.mp4';
import thumbnail14 from './videos/thumbnails/Japanese-Living-Room.jpg';

import background13 from './videos/Living-Room-Chill.mp4';
import thumbnail15 from './videos/thumbnails/Living-Room-Chill.jpg';

import background14 from './videos/Modern-Apartment-short.mp4';
import thumbnail16 from './videos/thumbnails/Modern-Apartment-short.jpg';

import background15 from './videos/Neon-City-Sunrise.mp4';
import thumbnail17 from './videos/thumbnails/Neon-City-Sunrise.jpg';

import background16 from './videos/Night-Drive.mp4';
import thumbnail18 from './videos/thumbnails/Night-Drive.jpg';

import background17 from './videos/Night-Study-Time.mp4';
import thumbnail19 from './videos/thumbnails/Night-Study-Time.jpg';

import background18 from './videos/Pixel-Night.mp4';
import thumbnail20 from './videos/thumbnails/Pixel-Night.jpg';

import background19 from './videos/Pixel-Room.mp4';
import thumbnail21 from './videos/thumbnails/Pixel-Room.jpg';

import background20 from './videos/Raining-Outside.mp4';
import thumbnail22 from './videos/thumbnails/Raining-Outside.jpg';

import background21 from './videos/Raining.mp4';
import thumbnail23 from './videos/thumbnails/Raining.jpg';

import background22 from './videos/Rainy-Night-Corner-Store.mp4';
import thumbnail24 from './videos/thumbnails/Rainy-Night-Corner-Store.jpg';

import background23 from './videos/Retro-Neon-Car.mp4';
import thumbnail25 from './videos/thumbnails/Retro-Neon-Car.jpg';

import background24 from './videos/Room-in-Space-earth.mp4';
import thumbnail26 from './videos/thumbnails/Room-in-Space-earth.jpg';

import background25 from './videos/Space-Apartment.mp4';
import thumbnail27 from './videos/thumbnails/Space-Apartment.jpg';

import background26 from './videos/Space-Bedroom.mp4';
import thumbnail28 from './videos/thumbnails/Space-Bedroom.jpg';

import background27 from './videos/Spacecraft-Cockpit.mp4';
import thumbnail29 from './videos/thumbnails/Spacecraft-Cockpit.jpg';

import background28 from './videos/Tiny-Camp-Fire.mp4';
import thumbnail30 from './videos/thumbnails/Tiny-Camp-Fire.jpg';

// Data structure for backgrounds
const backgrounds = [
    { name: 'Apartment Night Rain', src: apartmentNightRain, thumbnailSrc: thumbnail1 },
    { name: 'Study Room Sun Shower', src: studyRoomSunShower, thumbnailSrc: thumbnail2 },
    { name: '90s Office', src: background1, thumbnailSrc: thumbnail3 },
    { name: 'Astronaut Facing a Black Hole', src: background2, thumbnailSrc: thumbnail4 },
    { name: 'Bart Nirvana', src: background3, thumbnailSrc: thumbnail5 },
    { name: 'Bedroom in Space', src: background4, thumbnailSrc: thumbnail6 },
    { name: 'Bedroom with Fireplace', src: background5, thumbnailSrc: thumbnail7 },
    { name: 'Empty Classroom', src: background6, thumbnailSrc: thumbnail8 },
    { name: 'Futuristic Room Apartment', src: background7, thumbnailSrc: thumbnail9 },
    { name: 'Hacker Desk', src: background8, thumbnailSrc: thumbnail10 },
    { name: 'Home Office', src: background9, thumbnailSrc: thumbnail11 },
    //{ name: 'Japanese Autumn Leaves', src: background10, thumbnailSrc: thumbnail12 },
    { name: 'Japanese Living Room Night', src: background11, thumbnailSrc: thumbnail13 },
    //{ name: 'Japanese Living Room', src: background12, thumbnailSrc: thumbnail14 },
    { name: 'Living Room Chill', src: background13, thumbnailSrc: thumbnail15 },
    { name: 'Modern Apartment Short', src: background14, thumbnailSrc: thumbnail16 },
    { name: 'Neon City Sunrise', src: background15, thumbnailSrc: thumbnail17 },
    { name: 'Night Drive', src: background16, thumbnailSrc: thumbnail18 },
    //{ name: 'Night Study Time', src: background17, thumbnailSrc: thumbnail19 },
    { name: 'Pixel Night', src: background18, thumbnailSrc: thumbnail20 },
    { name: 'Pixel Room', src: background19, thumbnailSrc: thumbnail21 },
    { name: 'Raining Outside', src: background20, thumbnailSrc: thumbnail22 },
    { name: 'Raining', src: background21, thumbnailSrc: thumbnail23 },
    { name: 'Rainy Night Corner Store', src: background22, thumbnailSrc: thumbnail24 },
    { name: 'Retro Neon Car', src: background23, thumbnailSrc: thumbnail25 },
    { name: 'Room in Space Earth', src: background24, thumbnailSrc: thumbnail26 },
    { name: 'Space Apartment', src: background25, thumbnailSrc: thumbnail27 },
    { name: 'Space Bedroom', src: background26, thumbnailSrc: thumbnail28 },
    //{ name: 'Spacecraft Cockpit', src: background27, thumbnailSrc: thumbnail29 },
    { name: 'Tiny Camp Fire', src: background28, thumbnailSrc: thumbnail30 },
];

export default backgrounds;
