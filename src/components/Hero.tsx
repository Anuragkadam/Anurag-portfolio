import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import LazyImage from './LazyImage';
import ParallaxElement from './ParallaxElement';
import ParticleBackground from './ParticleBackground';
import { useGSAPAnimations } from '../hooks/useGSAPAnimations';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // GSAP Animations
  useGSAPAnimations(heroRef as React.RefObject<HTMLElement>, { fadeIn: true, slideUp: true, duration: 1.2 });
  useGSAPAnimations(titleRef as React.RefObject<HTMLElement>, { fadeIn: true, slideLeft: true, duration: 1, delay: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16 px-4 md:px-8 lg:px-12">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Animated Gradient Orbs with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxElement speed={0.3}>
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </ParallaxElement>
        
        <ParallaxElement speed={0.5} direction="right">
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 5,
            }}
          />
        </ParallaxElement>
        
        <ParallaxElement speed={0.2}>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </ParallaxElement>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center my-4 lg:my-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <motion.div className="space-y-6 lg:space-y-8 pr-0 lg:pr-8 max-w-2xl" variants={containerVariants}>
            {/* Main Heading - Most Important */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.h1
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 lg:mb-6"
                variants={itemVariants}
              >
                  <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                      <motion.span
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                      >
                        {personalInfo.name}
                      </motion.span>
                  </span>
                </motion.h1>
              
              {/* Animated Role - Directly under name */}
              <motion.div className="h-10 lg:h-12" variants={itemVariants}>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex gap-2">
                    <Code className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                    <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-pink-400" />
                    <GraduationCap className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300"
                    >
                      {personalInfo.roles[currentRoleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Description - Secondary Info */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.p
                className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed"
                variants={itemVariants}
              >
                {personalInfo.bio}
              </motion.p>
            </motion.div>

            {/* Status Badge - Visual Interest */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center gap-2 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Available for Work</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Action Area */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: '100%' }}
                  animate={{ x: isHovered ? '0%' : '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-purple-500/50 text-purple-300 rounded-xl font-medium backdrop-blur-sm hover:bg-purple-500/10 transition-all"
                whileHover={{ scale: 1.05, borderColor: 'rgb(147 51 234)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Get In Touch
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links - Secondary Action */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start pt-4"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end pl-0 lg:pl-8 mt-8 lg:mt-0"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Glowing Ring */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Profile Image Container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 backdrop-blur-sm"
                variants={floatingVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <LazyImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-lg"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Code size={20} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-lg"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 2,
                }}
              >
                <Briefcase size={20} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
