'use client';

import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

const themes = [
  { id: 'default', name: 'Rainforest Emerald & Sage (Default)', color: 'bg-emerald-500' },
  { id: 'theme-ocean', name: 'Oceanic Mint & Coastal Marine', color: 'bg-teal-500' },
  { id: 'theme-clay', name: 'Warm Earth & Soothing Amber', color: 'bg-amber-500' },
  { id: 'theme-lavender', name: 'Twilight Lavender & Charcoal', color: 'bg-purple-500' },
];

const THEME_STORAGE_KEY = 'wangaratta-massage-theme';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && ['default', 'theme-ocean', 'theme-clay', 'theme-lavender'].includes(savedTheme)) {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    document.documentElement.classList.remove('theme-ocean', 'theme-clay', 'theme-lavender', 'default');
    if (themeId !== 'default') {
      document.documentElement.classList.add(themeId);
    }
  };

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Storage access fallback
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 mb-3 w-72 bg-surface-950/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/80 border border-surface-800 overflow-hidden transition-all duration-200"
        >
          <div className="p-3.5 border-b border-surface-800 bg-surface-900/50 flex items-center justify-between">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider">Clinic Atmosphere Theme</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-surface-400 hover:text-white text-xs px-1"
            >
              &times;
            </button>
          </div>
          <div className="p-2 space-y-1">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  activeTheme === theme.id 
                    ? 'bg-surface-800 text-white border border-primary-500/50 shadow-sm' 
                    : 'text-surface-300 hover:bg-surface-900 hover:text-white'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full shadow-inner ${theme.color} ring-2 ring-white/20`} />
                <span className="truncate">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        aria-label="Toggle theme palette switcher"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-surface-900 text-primary-400 shadow-xl shadow-black/60 border border-surface-700 flex items-center justify-center hover:bg-surface-800 hover:text-primary-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}
