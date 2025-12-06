import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award, BookOpen, Mic, Trophy } from 'lucide-react';
import { achievements, type Achievement } from '../data/achievements';

const Achievements = () => {
  const [filter, setFilter] = useState<'all' | Achievement['type']>('all');

  const getTypeIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'certification':
        return <Trophy className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      case 'publication':
        return <BookOpen className="w-5 h-5" />;
      case 'speaking':
        return <Mic className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'certification':
        return 'from-blue-500 to-cyan-500';
      case 'award':
        return 'from-yellow-500 to-orange-500';
      case 'publication':
        return 'from-purple-500 to-pink-500';
      case 'speaking':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.type === filter);

  const featuredAchievements = filteredAchievements.filter(a => a.featured);
  const otherAchievements = filteredAchievements.filter(a => !a.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="achievements" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Certifications, awards, publications, and speaking engagements
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: 'all', label: 'All' },
            { value: 'certification', label: 'Certifications' },
            { value: 'award', label: 'Awards' },
            { value: 'publication', label: 'Publications' },
            { value: 'speaking', label: 'Speaking' },
          ].map(({ value, label }) => (
            <motion.button
              key={value}
              onClick={() => setFilter(value as 'all' | Achievement['type'])}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Achievements */}
        {featuredAchievements.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="group relative glass p-6 rounded-xl hover:scale-105 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium rounded-full">
                  Featured
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(achievement.type)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    {getTypeIcon(achievement.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        {achievement.issuer && (
                          <span>{achievement.issuer}</span>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{achievement.date}</span>
                        </div>
                      </div>
                      
                      {achievement.url && (
                        <motion.a
                          href={achievement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Other Achievements */}
        {otherAchievements.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Other Achievements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(achievement.type)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    {getTypeIcon(achievement.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      {achievement.issuer && <span>{achievement.issuer}</span>}
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  
                  {achievement.url && (
                    <motion.a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredAchievements.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 dark:text-gray-400">
              No achievements found for the selected filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
