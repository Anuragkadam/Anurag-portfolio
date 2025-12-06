import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar = ({ 
  progress, 
  className = '', 
  color = 'primary',
  size = 'md',
  showLabel = false,
  animated = true 
}: ProgressBarProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gradient-to-r from-purple-600 to-pink-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(displayProgress)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <motion.div
          className={`h-full ${getColorClasses()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ 
            duration: animated ? 1 : 0, 
            ease: 'easeOut',
            delay: animated ? 0.2 : 0
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
