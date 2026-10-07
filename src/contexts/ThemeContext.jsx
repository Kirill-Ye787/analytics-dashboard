import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('analytics-dashboard-theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.classList.toggle('theme-dark', theme === 'dark');
    try { localStorage.setItem('analytics-dashboard-theme', theme); } catch { /* Тема працює і без сховища. */ }
  }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme(current => current === 'light' ? 'dark' : 'light') }), [theme]);
  // useTheme не експортуємо: компоненти читають контекст через use().
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
