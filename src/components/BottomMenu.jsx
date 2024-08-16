import React, { useState, useRef, useEffect, Suspense } from 'react';
import YouTube from 'react-youtube';
import MusicControl from './MusicControl';
import VolumeControl from './VolumeControl';
import MusicSelection from './MusicSelection';
import AmbientSoundControl from './AmbientSoundControl';
import BackgroundSelector from './BackgroundSelector';
import Alert from '@material-tailwind/react';
import { ambientSoundsData } from '../assets/sounds'; // Import sound data
import videos from '../assets/musicData';
import Loading from './Loading';

const BottomMenu = ({ onBackgroundChange, backgrounds }) => {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [volume, setVolume] = useState(100);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const playerRef = useRef(null);
  const soundRefs = useRef({});
  const [ambientSounds, setAmbientSounds] = useState(ambientSoundsData);

  let activityTimer;

  const handleUserActivity = () => {
    clearTimeout(activityTimer);
    setIsMenuHidden(false);
    activityTimer = setTimeout(() => {
      setIsMenuHidden(true);
    }, 6000);
  };

  const hoverEffect = (event, listener) => {
    if (listener) {
      window.addEventListener(event, handleUserActivity);
    } else {
      window.removeEventListener('mousemove', handleUserActivity);
    }
  };

  useEffect(() => {
    hoverEffect('scroll', 'add');
    hoverEffect('mousemove', 'add');
    hoverEffect('keydown', 'add');
    return () => {
      clearTimeout(activityTimer);
      hoverEffect('scroll');
      hoverEffect('mousemove');
      hoverEffect('keydown');
    };
  }, []);

  useEffect(() => {
    ambientSounds.forEach((sound) => {
      if (soundRefs.current[sound.id]) {
        soundRefs.current[sound.id].volume = sound.volume / 100;
        sound.volume > 0
          ? soundRefs.current[sound.id].play()
          : soundRefs.current[sound.id].pause();
      }
    });
  }, [ambientSounds]);

  useEffect(() => {
    // const storedBackground = JSON.parse(
    //   window.localStorage.getItem('selectedBackground')
    // );
    const storedVideo = JSON.parse(
      window.localStorage.getItem('selectedVideo')
    );

    const storedAmbientSounds = JSON.parse(
      window.localStorage.getItem('ambientSounds')
    );

    // if (storedBackground) {
    //   onBackgroundChange(storedBackground);
    // }

    if (storedVideo) {
      setSelectedVideo(storedVideo);
    } else {
      setSelectedVideo(videos[0]);
    }

    if (storedAmbientSounds) {
      setAmbientSounds(storedAmbientSounds);
    }
  }, []);
  // Save Data on localStorage
  const saveData = (str, item) => {
    window.localStorage.setItem(str, JSON.stringify(item));
  };
  useEffect(() => {
    if (selectedVideo) {
      saveData('selectedVideo', selectedVideo);
    }
    saveData('ambientSounds', ambientSounds);
  }, [selectedVideo, ambientSounds]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      if (volume === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (playerRef.current) {
      if (newVolume === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(newVolume);
      }
    }
  };

  const handleAmbientSoundChange = (id, newValue) => {
    setAmbientSounds((prev) =>
      prev.map((sound) =>
        sound.id === id ? { ...sound, volume: newValue } : sound
      )
    );
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    if (playerRef.current) {
      playerRef.current.loadVideoById(video.id);
      playerRef.current.pauseVideo();
      if (volume === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    }
  };

  const handleBackgroundSelect = (background) => {
    onBackgroundChange(background.src);
    saveData('selectedBackground', background.src);
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    if (volume === 0) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
    }
  };

  const onPlayerError = (event) => {
    setError(event.data);
  };

  const onPlayerEnd = () => {
    const currentIndex = videos.findIndex(
      (video) => video.id === selectedVideo.id
    );
    const nextVideo = videos[(currentIndex + 1) % videos.length];
    handleVideoSelect(nextVideo);
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      mute: 1,
    },
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center flex-col md:flex-row transition-all"
      style={{ height: 'auto' }}
    >
      {error && (
        <Alert
          color="red"
          onClose={() => setError(null)}
          className="fixed top-4 right-4 w-1/3"
        >
          {error}
        </Alert>
      )}

      {/* Hidden audio elements for ambient sounds */}
      {ambientSounds.map((sound) => (
        <audio
          key={sound.id}
          ref={(el) => (soundRefs.current[sound.id] = el)}
          src={sound.src}
          loop
          style={{ display: 'none' }}
        />
      ))}

      <div
        className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${
          isMenuHidden
            ? '-translate-y-4 md:translate-y-0'
            : '-translate-y-16 md:translate-y-0'
        } z-10`}
      >
        {/* Music Control */}
        <Suspense fallback={<Loading />}>
          <MusicControl selectedVideo={selectedVideo} />
        </Suspense>
        {/* Volume Control */}
        <VolumeControl
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      </div>

      <div
        className={`flex items-center space-x-10 pr-4 md:pr-10 justify-center md:justify-end w-full md:w-full transition-all duration-500 md:h-[100px] ${
          isMenuHidden
            ? 'opacity-0 translate-y-10'
            : 'opacity-100 translate-y-0'
        }`}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))`,
        }}
      >
        {/* Music Selection */}
        <Suspense fallback={<Loading />}>
          <MusicSelection
            videos={videos}
            handleVideoSelect={handleVideoSelect}
          />
        </Suspense>
        {/* Ambient Sound Control */}
        <Suspense fallback={<Loading />}>
          <AmbientSoundControl
            ambientSounds={ambientSounds}
            handleAmbientSoundChange={handleAmbientSoundChange}
          />
        </Suspense>
        {/* Background Selector */}
        <Suspense fallback={<Loading />}>
          {/* {backgrounds.map((background, index) => {
            <BackgroundSelector
              key={index}
              {...background}
              handleBackgroundSelect={handleBackgroundSelect}
            />;
          })} */}
          <BackgroundSelector
            backgrounds={backgrounds}
            handleBackgroundSelect={handleBackgroundSelect}
          />
        </Suspense>
      </div>

      {/* YouTube Player */}
      <YouTube
        videoId={selectedVideo?.id}
        opts={opts}
        onReady={onPlayerReady}
        onError={onPlayerError}
        onEnd={onPlayerEnd}
      />
    </div>
  );
};

export default BottomMenu;
