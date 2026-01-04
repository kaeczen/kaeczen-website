import { useState, useEffect } from 'react';

export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: true,
    isDesktop: false,
    hasWebGL: false,
    prefersReducedMotion: false,
    screenWidth: 0
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const width = window.innerWidth;
      const isMobile = width < 1024;

      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setCapabilities({
        isMobile,
        isDesktop: !isMobile,
        hasWebGL: !!gl,
        prefersReducedMotion,
        screenWidth: width
      });
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return capabilities;
};

export default useDeviceCapabilities;
