import { useEffect } from 'react';

const useLocalStorageSync = (key: string, value: any) => {
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
};

export { useLocalStorageSync };
