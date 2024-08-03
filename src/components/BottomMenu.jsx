import React, { useState } from 'react';
import { AudioPlayer } from 'react-audio-play';
import { music } from '../constants';
const BottomMenu = () => {
  const [selectedMusic, setselectedMusic] = useState(music[0].music);
  return (
    <div className="flex w-full bg-gray-800/30 text-white p-4 h-20 justify-between">
      <AudioPlayer
        src={selectedMusic}
        color="#cfcfcf"
        backgroundColor="transparent"
        loop="false"
      />
      <div className="">
        {music.map((item) => (
          <h4 className="cursor-pointer"> {item.title}</h4>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
