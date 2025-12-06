import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, success, showPasswordToggle, className = '', type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
    };

    return (
      <div className={`relative ${className}`}>
        {/* Input container */}
        <motion.div
          className="relative"
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Accessible label (visually hidden to match textarea style) */}
          <motion.label
            htmlFor={props.id}
            className="sr-only"
          >
            {label}
          </motion.label>

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-3 py-3 border-2 rounded-lg transition-all duration-300 bg-transparent ${
              error
                ? 'border-red-500 focus:border-red-500'
                : success
                ? 'border-green-500 focus:border-green-500'
                : isFocused
                ? 'border-purple-500 focus:border-purple-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-purple-500'
            } focus:outline-none focus:ring-0`}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={handleChange}
            {...props}
          />

          {/* Status icons */}
          <div className="absolute right-3 top-3.5 flex items-center space-x-2">
            {showPasswordToggle && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </motion.button>
            )}

            {error && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-red-500"
              >
                <AlertCircle className="w-4 h-4" />
              </motion.div>
            )}

            {success && !error && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-green-500"
              >
                <CheckCircle className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          className="mt-1 text-xs text-red-500 min-h-[16px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: error ? 1 : 0,
            y: error ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
