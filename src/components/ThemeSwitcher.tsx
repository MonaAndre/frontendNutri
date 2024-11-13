import  { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('hs_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDarkOrAuto = savedTheme === 'dark' || (savedTheme === 'auto' && prefersDark);

    if (isDarkOrAuto) {
      html.setAttribute('data-mode', 'dark');
      setIsDarkMode(true);
    } else {
      html.removeAttribute('data-mode');
      setIsDarkMode(false);
    }
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    const newTheme = isDarkMode ? 'light' : 'dark';

    if (newTheme === 'dark') {
      html.setAttribute('data-mode', 'dark');
    } else {
      html.removeAttribute('data-mode');
    }

    localStorage.setItem('hs_theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <input
      type="checkbox"
      id="darkSwitch"
      checked={isDarkMode}
      onChange={handleToggle}
      data-hs-theme-switch=""
      className="relative w-[3.25rem] h-7 bg-gray-300 checked:bg-none checked:bg-blue-600 border-1 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-gray-300 focus:outline-none appearance-none
      before:inline-block before:size-6 before:bg-blue-500 checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200
      after:absolute after:end-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:start-1.5 checked:after:end-auto"
    />
  );
};

export default ThemeSwitcher;
