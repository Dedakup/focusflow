import React, { useState } from 'react';
import { MusicPlayer } from '@music';
import { VolumeControl } from '@music';
import { MusicSelection } from '@music';
import { AmbientSoundControl } from '@sounds';
import { BackgroundSelector } from '@background';

const BottomMenu = () => {
    // PROBLEM: Bottom menu shouldn't manage chield's state and side effects
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
