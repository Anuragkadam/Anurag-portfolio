import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import EducationTimeline from './components/EducationTimeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ReadingProgressIndicator from './components/ReadingProgressIndicator';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  return (
    <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <ReadingProgressIndicator />
      <Header />

      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Achievements />
        <EducationTimeline />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
