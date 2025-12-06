import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { experiences } from '../data/experience';

const Experience = () => {
  const primaryExp = experiences[0];

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
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
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and the companies I've worked with
          </p>
        </motion.div>

        {/* Featured single experience */}
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="relative glass p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20"
          >
            {/* Top badge with icon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30">
              <Briefcase className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">Current / Primary Role</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-2xl">
                  {primaryExp.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {primaryExp.title}
                  </h3>
                  <h4 className="text-lg font-medium text-purple-600 dark:text-purple-400">
                    {primaryExp.company}
                  </h4>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{primaryExp.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{primaryExp.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <motion.ul
              className="space-y-2 mb-6 text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              {primaryExp.description.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-purple-600 dark:text-purple-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Technologies */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={itemVariants}
            >
              {primaryExp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass p-8 rounded-xl max-w-2xl mx-auto">
            <Briefcase className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Open to Opportunities
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm always interested in hearing about new opportunities and exciting projects. 
              If you'd like to collaborate or discuss how I can help your team, feel free to reach out!
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
