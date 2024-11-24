// src/musicData.js

const baseYouTubeThumbnailUrl = 'https://img.youtube.com/vi';

const videos = [
  {
    id: 'c3suauAz0zQ',
    title: 'Nordic home office',
  }
];

// Adding thumbnail URL dynamically to each video object
const videosWithThumbnails = videos.map((video) => ({
  ...video,
  thumbnail: `${baseYouTubeThumbnailUrl}/${video.id}/0.jpg`,
}));

export default videosWithThumbnails;
