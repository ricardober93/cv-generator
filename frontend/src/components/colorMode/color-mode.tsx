import { useEffect, useState } from "react";

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
      onClick={toggleColorMode}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export { ColorModeButton };