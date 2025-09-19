import { HiSun } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext'
import { LuMoon } from 'react-icons/lu';

const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
            aria-label='Toggle dark mode'>
            {theme === 'dark' ? (
                <HiSun className='w-5 h-5'/>
            ) : (
                <LuMoon className='w-5 h-5'/>
            )}
        </button>
    )
}

export default ThemeToggle
