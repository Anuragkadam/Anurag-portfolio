import { useState, useEffect, useRef } from 'react';

const ReadingProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Avoid unnecessary updates if scroll position hasn't changed significantly
      if (Math.abs(scrollTop - lastScrollYRef.current) < 1) {
        rafRef.current = requestAnimationFrame(updateScrollProgress);
        return;
      }
      
      lastScrollYRef.current = scrollTop;
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(scrollPercent);
      
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    // Use requestAnimationFrame for smooth 60fps updates
    rafRef.current = requestAnimationFrame(updateScrollProgress);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 dark:bg-gray-700/30 z-50 lg:z-50 xl:z-50 2xl:z-50 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 transition-all duration-75 ease-out shadow-xl shadow-purple-500/50"
        style={{ 
          width: `${scrollProgress}%`,
          background: scrollProgress > 0 
            ? `linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) ${scrollProgress}%, rgb(147, 51, 234) 100%)`
            : undefined
        }}
      />
    </div>
  );
};

export default ReadingProgressIndicator;
