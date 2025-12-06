import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate search results using useMemo instead of setState in useEffect
  const results = useMemo(() => {
    if (query.trim() === '') {
      return { projects: [], skills: [] };
    }

    const lowercaseQuery = query.toLowerCase();
    
    // Search projects
    const filteredProjects = projects.filter(project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(lowercaseQuery)
      )
    );

    // Search skills
    const allSkills = [
      ...skills.frontend,
      ...skills.backend,
      ...skills.tools
    ];
    const filteredSkills = allSkills
      .filter(skill => skill.name.toLowerCase().includes(lowercaseQuery))
      .map(skill => skill.name);

    return { projects: filteredProjects, skills: filteredSkills };
  }, [query]);

  const getTotalResults = useCallback(() => results.projects.length + results.skills.length, [results]);

  const handleResultSelect = useCallback((index: number) => {
    const totalProjects = results.projects.length;
    if (index < totalProjects) {
      // Navigate to project
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to skills section
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % getTotalResults());
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + getTotalResults()) % getTotalResults());
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleResultSelect(selectedIndex);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, getTotalResults, handleResultSelect]);

  const getResultItem = (index: number) => {
    const totalProjects = results.projects.length;
    if (index < totalProjects) {
      const project = results.projects[index];
      return {
        type: 'project',
        title: project.title,
        description: project.description,
        icon: '📁'
      };
    } else {
      const skill = results.skills[index - totalProjects];
      return {
        type: 'skill',
        title: skill,
        description: 'Technology/Skill',
        icon: '⚡'
      };
    }
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Search (Press /)"
      >
        <Search size={20} />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl glass rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Search projects or skills..."
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                    autoFocus
                  />
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {getTotalResults() === 0 && query.trim() !== '' && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </div>
                )}

                {getTotalResults() > 0 && (
                  <div className="p-2">
                    {Array.from({ length: getTotalResults() }, (_, index) => {
                      const item = getResultItem(index);
                      return (
                        <motion.div
                          key={`${item.type}-${item.title}`}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedIndex === index
                              ? 'bg-purple-100 dark:bg-purple-900/30'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => handleResultSelect(index)}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
