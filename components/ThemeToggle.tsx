import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const darkMode = savedTheme === 'dark';
        setIsDarkMode(darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Add dark class
        } else {
            document.documentElement.classList.remove('dark'); // Remove dark class
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark'); // Remove dark class
            localStorage.setItem('theme', 'light');
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark'); // Add dark class
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button onClick={toggleTheme} className="p-2">
            {isDarkMode ? (
                <MoonIcon className="text-black-500" />
            ) : (
                <SunIcon className="text-yellow-500" />
            )}
        </button>
    );
};

export default ThemeToggle;
