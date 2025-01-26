import { useEffect, useState } from "react";
import { RiMoonFill, RiSunFill } from "react-icons/ri"

const ColorModeButton = () => {
  // Estado para manejar el modo de color
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar localStorage para la preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Efecto para aplicar el modo de color y guardar la preferencia
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Función para alternar el modo de color
  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      title="Toggle color mode"
      onClick={toggleColorMode}
      type="button"
      className="px-4 py-2 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-stone-600 dark:text-white rounded"
    >
      {isDarkMode ? <RiMoonFill /> : <RiSunFill />}
    </button>
  );
};

export { ColorModeButton };