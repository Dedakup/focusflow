import React, { useState } from 'react';
import MusicPlayer from '../music/MusicPlayer';
import VolumeControl from '../music/VolumeControl';
import MusicSelection from '../music/MusicSelection';
import AmbientSoundControl from '../../sounds/components/AmbientSoundControl';
import BackgroundSelector from './BackgroundSelector';

const BottomMenu = () => {
    // PROBLEM: Bottomm menu shouldn't manage chield's state and side effects
    const [isMenuHidden, setIsMenuHidden] = useState(true);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <MusicPlayer />
            <VolumeControl />
            <MusicSelection />
            <AmbientSoundControl />
            <BackgroundSelector />
        </div>
    );
};

export default BottomMenu;
