import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border text-sm dark:text-white"
    >
      {theme === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default ThemeToggle;
