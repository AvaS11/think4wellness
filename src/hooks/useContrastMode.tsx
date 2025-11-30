import { useEffect } from 'react';

export const useContrastMode = (contrastMode: string) => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove any existing contrast classes
    root.classList.remove('contrast-high', 'contrast-extra-high');
    
    // Apply the selected contrast mode
    if (contrastMode === 'high') {
      root.classList.add('contrast-high');
    } else if (contrastMode === 'extraHigh') {
      root.classList.add('contrast-extra-high');
    }
  }, [contrastMode]);
};
