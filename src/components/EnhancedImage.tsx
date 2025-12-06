import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMxMC4wNTkgMzAgMiAyMS45NDEgMiAxMlMxMC4wNTkgMiAyMCAyUzMOCAxMC4wNTkgMzggMjBTMjkuOTQxIDMwIDIwIDMwWk0yMCA4QzEzLjM3MyA4IDggMTMuMzczIDggMjBTMTMuMzczIDMyIDIwIDMyUzMyIDI2LjYyNyAzMiAyM1MyNi42MjcgOCAyMCA4WiIgZmlsbD0iI2QxZDVkYiIvPgo8L3N2Zz4K',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const imgElement = document.getElementById(`img-${src}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div id={`img-${src}`} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Blur effect */}
      <motion.div
        className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
        animate={{
          opacity: isLoaded ? 0 : 1,
          scale: isLoaded ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover filter blur-xl scale-110"
        />
      </motion.div>

      {/* Actual image */}
      {isInView && !error && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-600 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          animate={{
            scale: isLoaded ? 1 : 1.05,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && !error && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
};

export default EnhancedImage;
