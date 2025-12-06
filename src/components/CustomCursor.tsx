import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (typeof globalThis === 'undefined') return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleDown = () => setIsActive(true);
    const handleUp = () => setIsActive(false);

    const target = globalThis as unknown as Window;

    target.addEventListener('mousemove', handleMove);
    target.addEventListener('mousedown', handleDown);
    target.addEventListener('mouseup', handleUp);

    return () => {
      target.removeEventListener('mousemove', handleMove);
      target.removeEventListener('mousedown', handleDown);
      target.removeEventListener('mouseup', handleUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-screen">
      <motion.div
        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
        style={{
          translateX: springX,
          translateY: springY,
          marginLeft: -12,
          marginTop: -12,
        }}
        animate={{
          scale: isActive ? 0.7 : 1,
          opacity: isActive ? 0.9 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  );
};

export default CustomCursor;
