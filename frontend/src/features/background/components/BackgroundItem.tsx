import React from 'react';
import { Background } from '@background';

interface BackgroundItemProps {
    background: Background;
    isSelected: boolean;
    onSelect: (background: Background) => void;
}

export const BackgroundItem: React.FC<BackgroundItemProps> = ({
    background,
    isSelected,
    onSelect,
}) => (
    <div
        key={background.name}
        className={`relative cursor-pointer rounded-md overflow-hidden border ${
            isSelected ? 'border-blue-500' : ''
        }`}
        onClick={() => onSelect(background)}
    >
        <img
            src={background.thumbnailSrc}
            alt={background.name}
            className="w-full h-24 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity" />
    </div>
); 