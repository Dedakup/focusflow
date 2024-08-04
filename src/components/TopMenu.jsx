import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import {
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";

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
                    className={`font-semibold text-2xl hidden md:inline-block duration-500 ${isMenuHidden ?'text-gray-400' : 'text-white'}`}
                >
                    Focus Flow
                </Typography>
            </div>
            {/* Avatar */}
            <div
                className={`flex justify-end items-center transition-all duration-500 absolute top-0 right-0 left-0 px-4 md:px-10 ${isMenuHidden ? 'opacity-0 translate-y-[-100%]' : 'opacity-100 translate-y-0'}`}
                style={{
                    height: '110px',
                    backgroundImage: `linear-gradient(to bottom, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))`,
                }}
            >
                <AvatarWithUserDropdown />
            </div>
        </div>
    );
};
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

export function AvatarWithUserDropdown() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center rounded-full p-0"
                >
                    <Avatar
                        variant="circular"
                        size="md"
                        alt="User Avatar"
                        withBorder={true}
                        color="blue-gray"
                        className="p-0.5"
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default TopMenu;
