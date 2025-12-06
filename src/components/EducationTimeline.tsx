import { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, School, Zap } from 'lucide-react';
import { educationJourney, type EducationStep } from '../data/educationJourney';

const levelLabel = (level: 'college' | 'higher-secondary' | 'secondary') => {
  if (level === 'college') return 'College';
  if (level === 'higher-secondary') return 'Higher Secondary';
  return 'Secondary School';
};

const levelIcon = (level: 'college' | 'higher-secondary' | 'secondary') => {
  if (level === 'college') return <GraduationCap className="w-4 h-4" />;
  return <School className="w-4 h-4" />;
};

const EducationTimelineItem = ({ step, index }: { step: EducationStep; index: number }) => {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Card */}
      <motion.div
        className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="inline-block p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2 justify-center">
            {levelIcon(step.level)}
            <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
              {levelLabel(step.level)}
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
            {step.duration}
          </div>
          <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">
            {step.institution}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
            {step.boardOrDegree}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            {step.location}
          </div>
          {step.details && (
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {step.details}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />
    </motion.div>
  );
};

const EducationTimeline = () => {
  const [filter, setFilter] = useState<'All' | 'College' | 'School'>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return educationJourney;
    if (filter === 'College') return educationJourney.filter((s) => s.level === 'college');
    return educationJourney.filter((s) => s.level !== 'college');
  }, [filter]);

  return (
    <section
      id="education"
      className="section-padding bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header + summary */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-2 mb-4 backdrop-blur-md">
            <Zap className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-100">
              Education Journey
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 bg-clip-text text-transparent">
            From school roots to engineering graduate
          </h2>
          <p className="text-sm md:text-base text-slate-300/90">
            Tracing my path from 10th and 12th under MP Board to B.Tech in Information Technology.
          </p>
        </motion.div>

        {/* Simple filter chips */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {(['All', 'College', 'School'] as const).map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 backdrop-blur-sm
                ${filter === label
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/40'
                  : 'border-purple-500/40 text-slate-200 hover:border-purple-300 hover:bg-purple-500/10'}`}
            >
              {label === 'School' ? 'School (10th & 12th)' : label}
            </button>
          ))}
        </motion.div>

        {/* Centered vertical timeline with alternating cards */}
        <div className="relative max-w-7xl mx-auto mt-8">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />

          <div className="space-y-10 md:space-y-12">
            {filtered.map((step, index) => (
              <EducationTimelineItem key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
