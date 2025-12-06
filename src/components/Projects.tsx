import { motion } from 'framer-motion';
import { ExternalLink, Code, Zap } from 'lucide-react';
import { projects } from '../data/projects';
import EnhancedImage from './EnhancedImage';

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(147,51,234,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto relative z-10">

        {/* Section Header with Animated Elements */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="inline-flex items-center gap-2 mb-6">
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center gap-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">Portfolio</span>
            </motion.div>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Creative Works
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Scroll through a series of projects. Each project takes over the viewport like a slide, highlighting the problem, solution, and tech that powered it.
          </motion.p>
        </motion.div>

        {/* Project list (uses normal page scroll) */}
        <motion.div
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`min-h-[60vh] md:min-h-[70vh] flex flex-col md:flex-row items-center gap-10 rounded-3xl bg-white/80 dark:bg-gray-900/70 border border-purple-500/20 shadow-[0_20px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl px-6 py-8 md:px-10 md:py-12 transition-transform duration-500 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              whileHover={{ y: -6 }}
            >
              {/* Visual side */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/60 via-pink-500/40 to-blue-500/40 p-1 shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.25)_0,transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.4)_0,transparent_55%)] opacity-70" />
                  <div className="relative rounded-2xl overflow-hidden bg-black/80">
                    <EnhancedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 md:h-[340px] object-cover scale-[1.02] hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80">
                        <Code className="w-3 h-3" />
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex rounded-full bg-amber-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg">
                          Featured Build
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-500/90">
                    Project 0{index + 1}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500 dark:text-purple-400">
                      Technologies Used
                    </p>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.slice(0, 6).map((tech, index) => {
                      const gradients = [
                        'from-emerald-500 via-cyan-500 to-blue-500',
                        'from-purple-500 via-pink-500 to-rose-500',
                        'from-amber-500 via-orange-500 to-red-500',
                        'from-indigo-500 via-purple-500 to-pink-500',
                        'from-teal-500 via-cyan-500 to-blue-500',
                        'from-green-500 via-emerald-500 to-teal-500'
                      ];
                      const gradient = gradients[index % gradients.length];
                      
                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group relative"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
                          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-500/30 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-[0.6rem] text-white font-bold shadow-sm animate-pulse`}>
                                {tech.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {tech}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-shadow"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View live product
                  </motion.a>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Scroll to see next project ↓
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
