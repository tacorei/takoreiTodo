import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

const defaultTheme: Theme = {
  primary: 'blue',
  secondary: 'purple',
  background: 'gray',
  text: 'gray',
};

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme(current => ({ ...current, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}