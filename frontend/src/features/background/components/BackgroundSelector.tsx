import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//UI components
import {
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,
} from '@material-tailwind/react';
//Icons
import { EyeIcon as EyeIconSolid } from '@heroicons/react/24/solid';
import { EyeIcon as EyeIconOutline } from '@heroicons/react/24/outline';
//Store
import {
    selectBackgrounds,
    selectSelectedBackground,
    selectBackground,
} from '../store/backgroundSlice';
import { BackgroundItem } from './BackgroundItem';
import { Background } from '@background';

const BackgroundSelector: React.FC = () => {
    const dispatch = useDispatch();
    const backgrounds = useSelector(selectBackgrounds);
    const selectedBackground = useSelector(selectSelectedBackground);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleBackgroundSelect = (background: Background) => {
        dispatch(selectBackground(background));
    };

    return (
        <Popover
            placement="top"
            offset={{ mainAxis: 10 }}
            open={isPopoverOpen}
            handler={setIsPopoverOpen}
        >
            <PopoverHandler>
                <Button
                    type="button"
                    variant="text"
                    className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => {}}
                >
                    <EyeIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <EyeIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className="text-white text-sm mt-2">Visuals</span>
                </Button>
            </PopoverHandler>
            {isPopoverOpen && (
                <PopoverContent
                    className="w-72 h-96 overflow-y-auto p-4 bg-gray-700 text-white z-50"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onClick={() => {}}
                >
                    <div className="grid grid-cols-1 gap-4">
                        {backgrounds.map((background: Background) => (
                            <BackgroundItem
                                key={background.name}
                                background={background}
                                isSelected={
                                    selectedBackground?.name === background.name
                                }
                                onSelect={handleBackgroundSelect}
                            />
                        ))}
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};

export default BackgroundSelector;
