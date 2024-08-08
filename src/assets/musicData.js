// src/musicData.js

const baseYouTubeThumbnailUrl = 'https://img.youtube.com/vi';

const videos = [
    {
        id: 'IRp0zhUFi-M',
        title: 'Lofi Hip Hop Beats 24/7 Radio',
    },
    {
        id: 'JWlKA9wmO64',
        title: 'Japanese Lofi Radio 24/7',
    },
    {
        id: 'unl1zQoWD9A',
        title: '24/7 Dark Ambient Lofi 🌌 In Memory of Those We Miss',
    },
    {
        id: '8Yqx3we3WJ4',
        title: 'Space Lofi Hip Hop Radio 24/7 🚀 Chill Lofi Beats To Study, Lofi Sleep Music',
    },
    {
        id: '9ljhQoFsahw',
        title: 'Lofi Space Station 🚀 Aesthetic Lofi Beats to Chill / Study to 🌌 Lofi Radio',
    },
    {
        id: 'RyA-7mzA2SI',
        title: 'Rain Sounds & Lofi Music 🌧 Relaxing Lofi Sleep & Study Music 🌧',
    },
    {
        id: 'JQUNIbAT934',
        title: 'At the Laundry 🔴 Chill Lofi Hip Hop Beats to sleep/ study',
    },
];

// Adding thumbnail URL dynamically to each video object
const videosWithThumbnails = videos.map(video => ({
    ...video,
    thumbnail: `${baseYouTubeThumbnailUrl}/${video.id}/0.jpg`,
}));

export default videosWithThumbnails;
