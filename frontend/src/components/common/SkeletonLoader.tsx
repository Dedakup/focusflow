import React from 'react';
import PropTypes from 'prop-types';

const SkeletonLoader = ({ rows = 3 }) => {
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

SkeletonLoader.propTypes = {
    rows: PropTypes.number,
};

export default SkeletonLoader;
