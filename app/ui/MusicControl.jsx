import React from 'react';

const MusicControl = ({ selectedVideo }) => {
    return (
        <div className="flex items-center pl-4 md:pl-10 md:pb-0">
            {selectedVideo && (
                <div className="flex items-center text-left ml-4">
                    <a 
                        href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                    >
                        <img 
                            src={selectedVideo.thumbnail} 
                            alt={selectedVideo.title} 
                            className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md"
                        />
                        <span className="text-white ml-4 hover:underline">
                            {selectedVideo.title}
                        </span>
                    </a>
                </div>
            )}
        </div>
    );
};

export default MusicControl;
