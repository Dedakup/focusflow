import React, { useState } from 'react';
import MusicPlayer from '@music/components/MusicPlayer';
import VolumeControl from '@music/components/VolumeControl';
import MusicSelection from '@music/components/MusicSelection';
import AmbientSoundControl from '@sounds/components/AmbientSoundControl';
import BackgroundSelector from '@background/components/BackgroundSelector';

const BottomMenu = () => {
    // PROBLEM: Bottomm menu shouldn't manage chield's state and side effects
    const [isMenuHidden, setIsMenuHidden] = useState(true);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* <MusicPlayer /> */}
            {/* <VolumeControl /> */}
            {/* <MusicSelection /> */}
            {/* <AmbientSoundControl /> */}
            <BackgroundSelector />
        </div>
    );
};

export default BottomMenu;
