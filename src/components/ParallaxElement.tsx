import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const scrolled = window.pageYOffset;
      const speedFactor = speed * 100;

      let x = 0;
      let y = 0;

      switch (direction) {
        case 'up':
          y = -(scrolled * speedFactor) / 100;
          break;
        case 'down':
          y = (scrolled * speedFactor) / 100;
          break;
        case 'left':
          x = -(scrolled * speedFactor) / 100;
          break;
        case 'right':
          x = (scrolled * speedFactor) / 100;
          break;
      }

      setOffset({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;
