import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Loader2 } from 'lucide-react';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsDownloading(true);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, you would:
    // 1. Track the download in analytics
    // 2. Generate the resume from a template
    // 3. Serve the file from a CDN
    
    // For demo purposes, we'll create a dummy file
    const resumeContent = `
John Doe - Full Stack Developer
===================================

Contact:
- Email: john.doe@example.com
- Phone: +1 (555) 123-4567
- Location: San Francisco, CA
- Portfolio: https://johndoe.dev

Summary:
Passionate full-stack developer with 5+ years of experience building scalable web applications.

Skills:
- Frontend: React, TypeScript, Next.js, Tailwind CSS
- Backend: Node.js, Express, MongoDB, PostgreSQL
- Tools: Git, Docker, AWS, Google Cloud

Experience:
[Full experience details would go here]

Education:
[Education details would go here]
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `John-Doe-Resume.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Track download
    setDownloadCount(prev => prev + 1);
    console.log(`Resume downloaded in ${format} format. Total downloads: ${downloadCount + 1}`);
    
    // Send analytics event (in real app)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (event: string, action: string, options: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (event: string, action: string, options: Record<string, unknown>) => void }).gtag('event', 'resume_download', {
        'format': format,
        'download_count': downloadCount + 1
      });
    }
    
    setIsDownloading(false);
  };

  return (
    <motion.div
      className="glass p-8 rounded-xl max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <FileText className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Download My Resume
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Get a detailed overview of my experience, skills, and qualifications in your preferred format.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => handleDownload('pdf')}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isDownloading ? 1 : 1.05 }}
            whileTap={{ scale: isDownloading ? 1 : 0.95 }}
          >
            {isDownloading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </motion.button>
          
          <motion.button
            onClick={() => handleDownload('docx')}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isDownloading ? 1 : 1.05 }}
            whileTap={{ scale: isDownloading ? 1 : 0.95 }}
          >
            {isDownloading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating DOCX...
              </>
            ) : (
              <>
                <Download size={20} />
                Download DOCX
              </>
            )}
          </motion.button>
        </div>
        
        {/* Download Stats */}
        {downloadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Downloaded {downloadCount} {downloadCount === 1 ? 'time' : 'times'}
          </motion.div>
        )}
        
        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Always up-to-date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>ATS-friendly format</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Print-ready quality</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeDownload;
