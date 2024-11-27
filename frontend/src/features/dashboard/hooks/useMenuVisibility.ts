import { useState, useEffect } from 'react';

export const useMenuVisibility = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    let activityTimer;

    const handleUserActivity = () => {
        clearTimeout(activityTimer);
        setIsMenuHidden(false);
        activityTimer = setTimeout(() => {
            setIsMenuHidden(true);
        }, 1500);
    };

    useEffect(() => {
        const events = ['scroll', 'mousemove', 'keydown'];
        events.forEach((event) =>
            window.addEventListener(event, handleUserActivity),
        );

        return () => {
            clearTimeout(activityTimer);
            events.forEach((event) =>
                window.removeEventListener(event, handleUserActivity),
            );
        };
    }, []);

    return isMenuHidden;
};
