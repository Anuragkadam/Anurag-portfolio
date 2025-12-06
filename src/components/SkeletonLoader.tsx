import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const SkeletonLoader = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1 
}: SkeletonLoaderProps) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer';

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-xl';
      default:
        return 'rounded';
    }
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <motion.div
            key={i}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: '1rem',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
    />
  );
};

export default SkeletonLoader;
