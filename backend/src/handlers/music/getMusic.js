module.exports.getMusic = async () => {
    const musicList = [
        { id: 1, title: 'Lo-Fi Beats', url: 'https://example.com/music1.mp3' },
        { id: 2, title: 'Chill Vibes', url: 'https://example.com/music2.mp3' },
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(musicList),
    };
};
