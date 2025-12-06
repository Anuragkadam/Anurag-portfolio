import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../types';
import { personalInfo } from '../data/personalInfo';
import AnimatedInput from './AnimatedInput';
import { useFormValidation } from '../hooks/useFormValidation';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      email: true,
    },
    subject: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
  };

  const {
    validateField,
    setFieldTouched,
    validateAllFields,
    clearErrors,
    hasError,
    getErrorMessage,
  } = useFormValidation(validationRules);

  const onSubmit = async () => {
    const formDataForValidation = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    const isValid = validateAllFields(formDataForValidation);

    if (!isValid) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, publicKey);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      clearErrors();

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.social.linkedin,
    },
  ];

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

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Let's Connect
            </motion.h3>

            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                className={`glass p-6 rounded-xl flex items-center gap-4 hover:scale-105 transition-all duration-300 ${
                  info.label === 'Location' ? 'cursor-default' : 'hover:shadow-xl'
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onClick={(e) => info.label === 'Location' && e.preventDefault()}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                  <info.icon size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {info.label}
                  </div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Additional Info */}
            <motion.div
              className="glass p-6 rounded-xl mt-8"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Response Time
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                I typically respond to messages within 24 hours. For urgent matters, 
                please mention it in your message subject.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="glass p-8 rounded-xl space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>

              {/* Name Field */}
              <AnimatedInput
                label="Name"
                id="name"
                value={formData.name}
                error={getErrorMessage('name')}
                success={!hasError('name') && formData.name.length > 0}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({ ...prev, name: value }));
                  validateField('name', value);
                }}
                onBlur={() => setFieldTouched('name')}
                placeholder="Your name"
                required
              />

              {/* Email Field */}
              <AnimatedInput
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                error={getErrorMessage('email')}
                success={!hasError('email') && formData.email.length > 0 ? true : undefined}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({ ...prev, email: value }));
                  validateField('email', value);
                }}
                onBlur={() => setFieldTouched('email')}
                placeholder="you@example.com"
                required
              />

              {/* Subject Field */}
              <AnimatedInput
                label="Subject"
                id="subject"
                value={formData.subject || ''}
                error={getErrorMessage('subject')}
                success={!hasError('subject') && !!formData.subject && formData.subject.length > 0}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({ ...prev, subject: value }));
                  validateField('subject', value);
                }}
                onBlur={() => setFieldTouched('subject')}
                placeholder="Project Inquiry"
                required
              />

              {/* Message Field */}
              <div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({ ...prev, message: value }));
                    validateField('message', value);
                  }}
                  onBlur={() => setFieldTouched('message')}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    hasError('message')
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all resize-none`}
                />
                {getErrorMessage('message') && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage('message')}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                animate={{
                  scale: submitStatus === 'success' ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle size={20} />
                    Try Again
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Enhanced Status Messages */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm opacity-75">I'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <p className="font-semibold">Oops! Something went wrong</p>
                      <p className="text-sm opacity-75">Please try again in a moment.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
