import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";

const TopMenu = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    useEffect(() => {
        let activityTimer;

        const handleUserActivity = () => {
            clearTimeout(activityTimer);
            setIsMenuHidden(false); // Show menu on activity
            activityTimer = setTimeout(() => {
                setIsMenuHidden(true); // Hide menu after 6 seconds of inactivity
            }, 6000);
        };

        const events = ['mousemove', 'scroll', 'keydown'];
        events.forEach(event => window.addEventListener(event, handleUserActivity));

        // Cleanup event listeners and timer on component unmount
        return () => {
            clearTimeout(activityTimer);
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[105px] z-50 transition-all duration-500">
            <div className="flex items-center h-full px-4 md:px-10">
                <img src="/Logo.png" alt="logo" className="mr-2 h-42 md:h-42" />
                <Typography
                    as="span"
                    variant="h6"
                    className={`font-semibold text-2xl hidden md:inline-block duration-500 ${isMenuHidden ? 'text-gray-400' : 'text-white'}`}
                >
                    Focus Flow
                </Typography>
            </div>
        </div>
    );
};

export default TopMenu;
