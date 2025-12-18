import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'normal' | 'christmas';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('christmas'); // 👈 FORCE DEFAULT

  useEffect(() => {
    const saved = localStorage.getItem('app-theme') as Theme | null;

    // ✅ Only use saved value if valid
    if (saved === 'normal' || saved === 'christmas') {
      setTheme(saved);
    } else {
      setTheme('christmas'); // default
      localStorage.setItem('app-theme', 'christmas');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);

    document.documentElement.classList.remove('theme-normal', 'theme-christmas');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'normal' ? 'christmas' : 'normal'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}