
import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
  const [device, setDevice] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) { // Tailwind's 'md' breakpoint
        setDevice('mobile');
      } else if (width >= 768 && width < 1024) { // Tailwind's 'lg' breakpoint
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    // Set initial device on mount
    checkDevice();

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkDevice);
  }, []); 

  return {
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    device,
  };
};

export default useDeviceDetect;