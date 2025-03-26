import { useState } from 'react';

type Theme = 'default' | 'modern' | 'elegant' | 'creative';

interface ThemeStyles {
  background: string;
  text: string;
  accent: string;
  skill: string;
  skillDark: string;
  fontFamily: string;
  headingFont: string;
}

export const themes: Record<Theme, ThemeStyles> = {
  default: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'border-amber-400',
    skill: 'bg-amber-100 text-amber-800',
    skillDark: 'dark:bg-amber-800 dark:text-amber-100',
    fontFamily: 'font-sans',
    headingFont: 'font-serif'
  },
  modern: {
    background: 'bg-white',
    text: 'text-slate-900',
    accent: 'border-blue-500',
    skill: 'bg-blue-100 text-blue-800',
    skillDark: 'dark:bg-blue-800 dark:text-blue-100',
    fontFamily: 'font-mono',
    headingFont: 'font-sans'
  },
  elegant: {
    background: 'bg-stone-50',
    text: 'text-stone-900',
    accent: 'border-emerald-500',
    skill: 'bg-emerald-100 text-emerald-800',
    skillDark: 'dark:bg-emerald-800 dark:text-emerald-100',
    fontFamily: 'font-serif',
    headingFont: 'font-serif'
  },
  creative: {
    background: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'border-pink-500',
    skill: 'bg-pink-100 text-pink-800',
    skillDark: 'dark:bg-pink-800 dark:text-pink-100',
    fontFamily: 'font-sans',
    headingFont: 'font-mono'
  }
};

export const useThemeStyles = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  const getCurrentTheme = () => themes[currentTheme];

  return {
    currentTheme,
    setCurrentTheme,
    themeStyles: getCurrentTheme()
  };
};