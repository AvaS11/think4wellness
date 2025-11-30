import { useEffect } from 'react';

const fontSizeMap = {
  small: '87.5%',   // 14px (87.5% of 16px)
  medium: '100%',   // 16px (default)
  large: '112.5%',  // 18px (112.5% of 16px)
  extraLarge: '125%' // 20px (125% of 16px)
};

export const useFontSize = (fontSize: string) => {
  useEffect(() => {
    const root = document.documentElement;
    const size = fontSizeMap[fontSize as keyof typeof fontSizeMap] || fontSizeMap.medium;
    // Set font-size on html element so rem units scale throughout the app
    root.style.fontSize = size;
  }, [fontSize]);
};
