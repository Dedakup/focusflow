import React, { useState, useEffect } from 'react';
import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    IconButton,
} from "@material-tailwind/react";

const BottomMenu = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    useEffect(() => {
        const handleUserActivity = () => {
            clearTimeout(window.activityTimer);
            setIsMenuHidden(false); // Show menu on activity
            window.activityTimer = setTimeout(() => {
                setIsMenuHidden(true); // Hide menu after 6 seconds of inactivity
            }, 6000);
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            clearTimeout(window.activityTimer);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 flex items-center flex-col md:flex-row transition-all `}
            style={{ height: 'auto' }}
        >
            {/* First Block */}
            <div className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${isMenuHidden ? '-translate-y-4 md:translate-y-0' : 'translate-y-[-110%] md:translate-y-0'
                } `}>
                <div className="flex items-center pl-4 pb-4 md:pl-10 md:pb-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md"></div>
                    <div className="flex flex-col text-left ml-4">
                        <div className="text-white">Tidings</div>
                        <div className="text-gray-400">anbuu</div>
                    </div>
                </div>
                <div className={`flex items-center pr-4 pb-4 md:pr-0 md:pb-0  md:ml-40 space-x-10 duration-500 ${isMenuHidden ? 'translate-y-0 md:translate-y-[300%]' : 'translate-y-0'
                    } `}>
                    <IconButton variant="text" className="rounded-full w-24 h-24">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                    </IconButton>
                    <IconButton variant="text" className="rounded-full w-24 h-24">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                        </svg>
                    </IconButton>
                </div>
            </div>

            {/* Second Block (Main Menu) */}
            <div
                className={`flex items-center justify-center md:justify-end w-full md:w-full transition-all duration-500 md:h-[100px] ${isMenuHidden ? 'opacity-0 translate-y-[100%]' : 'opacity-100 translate-y-0'
                    }`}
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))`,
                }}
            >
                <div className="px-4 md:px-10 flex justify-around space-x-10">
                    <ButtonWithPopover label="Music" icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                        </svg>
                    }
                    />
                    <ButtonWithPopover label="Sounds" icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    } />
                    <ButtonWithPopover label="Visuals" icon={

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    } />
                </div>
            </div>
        </div>
    );
};

const ButtonWithPopover = ({ label, icon }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="top-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="black"
                    className="flex items-center p-2 text-white"
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col items-center">
                        {icon && <div className="icon-size-24 mb-2">{icon}</div>}
                        <div className='text-xs font-extralight'>{label}</div>
                    </div>
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                <MenuItem onClick={toggleMenu}>Action 1</MenuItem>
                <MenuItem onClick={toggleMenu}>Action 2</MenuItem>
                <MenuItem onClick={toggleMenu}>Action 3</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default BottomMenu;
