import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { LuMoon, LuSun } from "react-icons/lu";

import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            className={`theme-toggle ${theme}`} 
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        >
            <div className="toggle-circle">
                {theme === 'light' ? <LuSun /> : <LuMoon color='#fff'/>}
            </div>
        </button>
    );
};

export default ThemeToggle;
