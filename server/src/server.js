import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sounds from './assets/sounds.js';
import backgrounds from './assets/backgrounds.js';
import videos from './assets/musicData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/sounds', (req, res) => {
    res.json(sounds.map(sound => ({
        ...sound,
        src: `/assets/sounds/${path.basename(sound.src)}`,
    })));
});

app.get('/api/backgrounds', (req, res) => {
    res.json(backgrounds.map(background => ({
        ...background,
        src: `/assets/videos/${path.basename(background.src)}`,
        thumbnailSrc: `/assets/videos/thumbnails/${path.basename(background.thumbnailSrc)}`,
    })));
});

app.get('/api/videos', (req, res) => {
    res.json(videos);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
