import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import ProgressBar from './ProgressBar';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

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

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'success';
    if (level >= 75) return 'primary';
    if (level >= 60) return 'warning';
    return 'error';
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Master';
    if (level >= 75) return 'Expert';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {skill.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {getLevelText(skill.level)}
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {skill.level}%
          </span>
        </div>
      </div>
      
      <ProgressBar 
        progress={skill.level} 
        color={getLevelColor(skill.level)}
        size="sm"
        animated={true}
      />
    </motion.div>
  );
};

const CategoryCard = ({ title, items, icon, gradient }: { 
  title: string; 
  items: Skill[]; 
  icon: string; 
  gradient: string;
}) => (
  <motion.div
    className="glass p-8 rounded-xl hover:scale-105 transition-transform duration-300"
    variants={itemVariants}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center text-2xl text-white`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gradient">
        {title}
      </h3>
    </div>
    
    <div className="space-y-4">
      {items.map((skill, index) => (
        <SkillBar key={skill.name} skill={skill} index={index} />
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My technical expertise and the tools I use to build amazing products
          </p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CategoryCard
            title="Frontend"
            items={skills.frontend}
            icon="🎨"
            gradient="from-blue-500 to-cyan-500"
          />
          
          <CategoryCard
            title="Backend"
            items={skills.backend}
            icon="⚙️"
            gradient="from-green-500 to-emerald-500"
          />
          
          <CategoryCard
            title="Tools"
            items={skills.tools}
            icon="🛠️"
            gradient="from-purple-500 to-pink-500"
          />
        </motion.div>

        {/* Additional Skills Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Always Learning, Always Growing
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            I'm constantly expanding my skill set and staying up-to-date with the latest technologies 
            and best practices in web development. Currently exploring advanced React patterns, 
            cloud architecture, and AI integration.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js', 'GraphQL', 'Docker', 'AWS', 'TypeScript', 'Testing'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
