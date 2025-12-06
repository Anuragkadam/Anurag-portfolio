import { motion } from 'framer-motion';

interface SkeletonCardProps {
  viewMode?: 'grid' | 'list';
}

const SkeletonCard = ({ viewMode = 'grid' }: SkeletonCardProps) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Skeleton */}
          <div className="md:w-1/3 h-48 md:h-auto">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
              animate={{
                background: [
                  'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%',
                  'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          
          {/* Content Skeleton */}
          <div className="flex-1 p-6 space-y-4">
            <motion.div
              className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"
              animate={{
                background: [
                  'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                  'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <div className="space-y-2">
              <motion.div
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
                animate={{
                  background: [
                    'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                    'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"
                animate={{
                  background: [
                    'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                    'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />
            </div>
            
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                  animate={{
                    background: [
                      'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                      'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              <motion.div
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"
                animate={{
                  background: [
                    'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                    'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"
                animate={{
                  background: [
                    'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                    'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Skeleton */}
      <div className="aspect-video">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
          animate={{
            background: [
              'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%',
              'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <motion.div
          className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"
          animate={{
            background: [
              'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
              'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="space-y-2">
          <motion.div
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
            animate={{
              background: [
                'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"
            animate={{
              background: [
                'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.div
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"
            animate={{
              background: [
                'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </div>
        
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"
              animate={{
                background: [
                  'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                  'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            />
          ))}
        </div>
        
        <div className="flex gap-3">
          <motion.div
            className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"
            animate={{
              background: [
                'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"
            animate={{
              background: [
                'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%',
                'linear-gradient(90deg, #4b5563 25%, #374151 50%, #4b5563 75%',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
