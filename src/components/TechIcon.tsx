import { useState } from 'react';
import { motion } from 'framer-motion';

interface TechIconProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  level?: number;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({
  name,
  icon,
  color,
  level = 0,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon container */}
      <motion.div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} shadow-lg`}
        animate={{
          rotate: isHovered ? 360 : 0,
          boxShadow: isHovered ? '0 20px 40px rgba(147, 51, 234, 0.3)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="text-white text-2xl">
          {icon}
        </div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        {name}
        {level > 0 && (
          <div className="text-xs opacity-75">
            Proficiency: {level}%
          </div>
        )}
        
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
        </div>
      </motion.div>

      {/* Particle effects on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%',
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: `${50 + Math.cos((i * 60) * Math.PI / 180) * 30}px`,
                y: `${50 + Math.sin((i * 60) * Math.PI / 180) * 30}px`,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TechIcon;
