'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initial = saved || (document.documentElement.classList.contains('light') ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', initial === 'dark');
    document.documentElement.classList.toggle('light', initial === 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.classList.toggle('light', next === 'light');
      return next;
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={toggleTheme}
      className="h-8 px-2.5 border-slate-700/80 text-slate-300 hover:text-white dark:border-slate-800 cursor-pointer"
      title={`Switch to ${theme === 'dark' ? 'Light Lab' : 'Dark Cyberpunk'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-cyan-600 transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
}
