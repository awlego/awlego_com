import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'night' || (!savedTheme && prefersDark)) {
      setIsNight(true);
      document.documentElement.setAttribute('data-theme', 'night');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isNight ? 'day' : 'night';
    setIsNight(!isNight);
    document.documentElement.setAttribute('data-theme', newTheme === 'night' ? 'night' : '');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isNight ? 'day' : 'night'} mode`}
    >
      <div className="theme-toggle__knob">
        {isNight ? '☽' : '☀'}
      </div>
    </button>
  );
}
