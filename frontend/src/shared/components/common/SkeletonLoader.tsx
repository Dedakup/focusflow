import React from 'react';

export interface SkeletonLoaderProps {
    rows?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows = 3 }) => {
    return (
        <div className="space-y-2">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="w-full h-6 bg-gray-300 rounded animate-pulse"
                ></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
