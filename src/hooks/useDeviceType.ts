import { useEffect, useState } from 'react';

export function useDeviceType() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'laptop'>('laptop');

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      if (width <= 600) setDevice('mobile');
      else if (width <= 1024) setDevice('tablet');
      else setDevice('laptop');
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return device;
}
