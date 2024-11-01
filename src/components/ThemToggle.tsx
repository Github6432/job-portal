// components/ThemeToggle.tsx
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button onClick={toggleTheme}>
            {isDarkMode ? (<MoonIcon className="text-black-500" />) : (<SunIcon className="text-yellow-500" />)}
        </button>
    );
};

export default ThemeToggle;
