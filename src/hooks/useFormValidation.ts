import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((fieldName: string, value: string): string | null => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return null;

    // Required validation
    if (fieldRules.required && (!value || value.trim() === '')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    // Email validation
    if (fieldRules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Min length validation
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${fieldRules.minLength} characters`;
    }

    // Max length validation
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${fieldRules.maxLength} characters`;
    }

    // Pattern validation
    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} format is invalid`;
    }

    // Custom validation
    if (fieldRules.custom && value) {
      return fieldRules.custom(value);
    }

    return null;
  }, [rules]);

  const validateFieldRealTime = useCallback((fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
    return error;
  }, [validateField]);

  const setFieldTouched = useCallback((fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  }, []);

  const validateAllFields = useCallback((formData: { [key: string]: string }) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const hasError = useCallback((fieldName: string) => {
    return touched[fieldName] && !!errors[fieldName];
  }, [touched, errors]);

  const getErrorMessage = useCallback((fieldName: string) => {
    return touched[fieldName] ? errors[fieldName] : '';
  }, [touched, errors]);

  return {
    errors,
    touched,
    validateField: validateFieldRealTime,
    setFieldTouched,
    validateAllFields,
    clearErrors,
    hasError,
    getErrorMessage,
  };
};
