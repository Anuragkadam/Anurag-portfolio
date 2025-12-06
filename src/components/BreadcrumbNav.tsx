import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items, 
  className = '' 
}) => {
  const location = useLocation();

  // Generate breadcrumbs automatically if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    pathnames.forEach((path, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      // Convert path to readable format
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      
      breadcrumbs.push({
        label,
        path: isLast ? undefined : routeTo
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = items || generateBreadcrumbs();

  return (
    <motion.nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === 0 && (
            <Home className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
          )}
          
          {item.path ? (
            <Link
              to={item.path}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}

          {index < breadcrumbs.length - 1 && (
            <motion.div
              className="mx-2 text-gray-400"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      ))}
    </motion.nav>
  );
};

export default BreadcrumbNav;
