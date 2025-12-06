import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  className = '',
  width = 'w-full',
  height = 'h-64',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative ${width} ${height} ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotateY: 180 }}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </motion.div>
      </motion.div>

      {/* Flip button */}
      <motion.button
        className="absolute bottom-4 right-4 p-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all"
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Flip card"
      >
        <svg
          className="w-4 h-4 text-gray-600 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default FlipCard;
