import { useEffect } from 'react';

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px',
  extraLarge: '20px'
};

export const useFontSize = (fontSize: string) => {
  useEffect(() => {
    const root = document.documentElement;
    const size = fontSizeMap[fontSize as keyof typeof fontSizeMap] || fontSizeMap.medium;
    root.style.setProperty('--base-font-size', size);
  }, [fontSize]);
};
