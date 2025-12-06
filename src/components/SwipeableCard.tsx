import { useState, useRef, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    const threshold = 100;
    const velocity = 500;

    if (info.offset.x > threshold || info.velocity.x > velocity) {
      onSwipeRight?.();
    } else if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      onSwipeLeft?.();
    }

    setDragOffset(0);
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setDragOffset(info.offset.x);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && cardRef.current) {
        e.preventDefault();
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative touch-pan-y ${className}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      style={{
        x: dragOffset,
      }}
    >
      {/* Swipe indicators */}
      <motion.div
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 opacity-0 pointer-events-none"
        animate={{
          opacity: dragOffset < -50 ? 1 : 0,
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 opacity-0 pointer-events-none"
        animate={{
          opacity: dragOffset > 50 ? 1 : 0,
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>

      {children}
    </motion.div>
  );
};

export default SwipeableCard;
