import { useEffect } from 'react';

export const useHeightResize = () => {
    const setHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    useEffect(() => {
        setHeight();
        window.addEventListener('resize', setHeight);

        return window.removeEventListener('resize', setHeight);
    }, []);
};
