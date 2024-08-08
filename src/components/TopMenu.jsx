import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";

const TopMenu = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    // Таймер для отслеживания активности пользователя
    let activityTimer;

    useEffect(() => {
        const handleUserActivity = () => {
            clearTimeout(activityTimer);
            setIsMenuHidden(false); // Показать меню при активности
            activityTimer = setTimeout(() => {
                setIsMenuHidden(true); // Скрыть меню через 10 секунд неактивности
            }, 6000);
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Очистка слушателей и таймера при размонтировании компонента
        return () => {
            clearTimeout(activityTimer);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-[105px]">
            {/* Logo */}
            <div className="flex items-center h-full px-4 md:px-10">
                <img src="../../public/Logo.png" alt="logo" className="mr-2 h-42 md:h-42" />
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
