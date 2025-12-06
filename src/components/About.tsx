import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, FolderGit, Trophy, MapPin, Mail, Sparkles, Heart} from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import ResumeDownload from './ResumeDownload';

const About = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  const stats = [
    {
      icon: Briefcase,
      value: '2.5+',
      label: 'Years Experience',
      color: 'from-blue-500 to-cyan-500',
      description: 'Building digital solutions'
    },
    {
      icon: FolderGit,
      value: '15+',
      label: 'Projects Delivered',
      color: 'from-purple-500 to-pink-500',
      description: 'Across various industries'
    },
    {
      icon: Trophy,
      value: '5+',
      label: 'Awards & Certifications',
      color: 'from-yellow-500 to-orange-500',
      description: 'Industry recognition'
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"
          style={{ scale: springScale }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
          style={{ rotate }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center gap-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">My Story</span>
            </motion.div>
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            About Me
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Passionate developer crafting digital experiences that blend creativity with cutting-edge technology
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Enhanced Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <motion.img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                alt="Professional portrait"
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Animated Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Floating Elements - Moved outside image container */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Available
              </span>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Open to work</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {personalInfo.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              
              {/* Enhanced Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <motion.div
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-200 dark:border-purple-700"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-medium text-gray-900 dark:text-white">{personalInfo.email}</div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-200 dark:border-purple-700"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">{personalInfo.location}</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Stats with Animations */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-3 gap-4"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl text-center border border-gray-200 dark:border-gray-700 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: '0 20px 40px rgba(147, 51, 234, 0.2)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  <motion.div
                    className={`w-14 h-14 mx-auto mb-3 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white relative z-10`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon size={24} />
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-1 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 relative z-10">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-500 relative z-10">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Resume Download */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ResumeDownload />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
