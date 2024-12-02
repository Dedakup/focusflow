import React from 'react';
import { useAppSelector, useAppDispatch } from '@hooks';
import { setSelectedMusicSource, setIsPlaying, setVolume } from '@music';
import { VolumeControl } from '@music';

interface MusicSource {
    id: string;
    thumbnail: string;
    title: string;
}

const MusicPlayer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedMusicSource, isPlaying, volume } = useAppSelector((state) => state.music);

    const handlePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying));
    };

    const handleVolumeChange = (newVolume: number) => {
        dispatch(setVolume(newVolume));
    };

    const handleMusicSelect = (musicSource: MusicSource) => {
        dispatch(setSelectedMusicSource(musicSource));
    };

    return (
        <div className="flex items-center pl-4 md:pl-10 md:pb-0">
            {selectedMusicSource && (
                <>
                    <div className="flex items-center text-left ml-4">
                        <a
                            href={`https://www.youtube.com/watch?v=${selectedMusicSource.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={selectedMusicSource.thumbnail}
                                alt={selectedMusicSource.title}
                                className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md"
                            />
                        </a>
                        <a
                            href={`https://www.youtube.com/watch?v=${selectedMusicSource.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white ml-4 hover:underline"
                        >
                            {selectedMusicSource.title}
                        </a>
                    </div>
                    <VolumeControl
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                        volume={volume}
                        handleVolumeChange={handleVolumeChange}
                    />
                </>
            )}
        </div>
    );
};

export default MusicPlayer;
