import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { SunIcon, MoonIcon, HomeIcon, LightBulbIcon, UserIcon, CodeBracketIcon, BriefcaseIcon, EnvelopeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
//import Home from '../pages/Home';
import AnimatedSkillsBackground from './AnimateSkillsBG';


// Define the type for a section
interface Section {
  id: string;
  name: string;
  icon: React.ElementType;
  path: string;
}

// Sections
const sections: Section[] = [
  { id: 'home', name: 'Home', icon: HomeIcon, path: '/' },
  { id: 'about', name: 'About', icon: UserIcon, path: '/about' },
  { id: 'skills', name: 'Skills', icon: CodeBracketIcon, path: '/skills' },
  { id: 'work', name: 'Work', icon: BriefcaseIcon, path: '/work' },
  { id: 'ideas', name: 'Ideas', icon: LightBulbIcon, path: '/ideas' },
  { id: 'contact', name: 'Contact', icon: EnvelopeIcon, path: '/contact' },
];

const HomeLayout: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('theme');
        if (savedMode) return savedMode === 'dark';
        // Check system preference only if no saved theme
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }); 
  const [activeSection, setActiveSection] = useState('home'); 
  const [isHeaderHidden, setHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  // Hide header on scroll down
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastY.current;
    if (y < 50) { // Always show header at the top
        setHeaderHidden(false);
    } else if (difference > 0) { // Scrolling down
        setHeaderHidden(true);
    } else { // Scrolling up
        setHeaderHidden(false);
    }
    lastY.current = y;
  });

  // Dynamic Greeting
  const currentHour = new Date().getHours();
              const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";
              
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = sections.find(section => section.path === currentPath);
    if (active) {
      setActiveSection(active.id);
    } else if (currentPath === '/') {
      setActiveSection('home'); // Default to home if on home path
    }
  }, [location.pathname]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const handleNavClick = useCallback((path: string, id: string) => {
    setActiveSection(id);
    navigate(path);
  }, [navigate]);

  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white 
    dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-500 relative">
      {/* Immersive Editable Background - Placeholder for now */}
      <div className="fixed inset-0 z-0 opacity-100 transition-opacity duration-500">
        
        {/* The Animated Skills Component goes here */}
        <AnimatedSkillsBackground /> 
        
        {/* Keep the subtle noise/grain layer for texture (optional) */}
        <div className="fixed inset-0 bg-white dark:bg-black opacity-5"></div>
      </div>
    

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 dark:bg-green-500 transform origin-[0%] z-50"
        style={{ scaleX }}
      />

      {/* Floating Tabs (Header) */}
      <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" }
      }}
      animate={isHeaderHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 z-40 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-10rem)] left-1/2 -translate-x-1/2 p-2 
      bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-full shadow-xl border border-white/20 dark:border-gray-700/50 
      transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-100">
            Welcome, {greeting}
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1">
            {sections.slice(1).map((section) => ( // Home tab sliced
              <button
                key={section.id}
                onClick={() => handleNavClick(section.path, section.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === section.id
                    ? 'text-white bg-blue-500 shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {activeSection === section.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {section.name}
              </button>
            ))}
          </nav>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-white" />
            </button>
          </div>


          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 ml-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300 hover:scale-110 hover:bg-white/50 dark:hover:bg-gray-700/50"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Floating Navigation Buttons (Left Side) */}
      <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col space-y-4">
        {sections.slice(1).map((section) => { // Home button sliced
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              onClick={() => handleNavClick(section.path, section.id)}
              className={`relative p-3 rounded-full shadow-lg transition-all duration-300 group
                ${activeSection === section.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              whileHover={{ 
                scale: 1.2,
                y: -2, // Subtle lift
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)" // Deeper shadow on hover
               }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-6 w-6" />
              <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {section.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 py-8 pt-32 min-h-screen"> {/* Added pt-24 to prevent content from hiding behind fixed header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Contents of Home Page - only visible on route "/" */}
            {/* {location.pathname === '/' && (
              <Home />
            )} */}
            <Outlet />
          </motion.div>
        </AnimatePresence>
        
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 bg-black/30 md:hidden flex items-center justify-center p-4"
            onClick={() => setMobileMenuOpen(false)} // Close on overlay click
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // Prevent card click from closing menu
            >
              <div className="grid grid-cols-2 landscape:grid-cols-3 gap-4 overflow-y-auto">
                {sections.slice(1).map((section) => ( // Sliced Home button on Mobile
                  <motion.button
                    key={`mobile-${section.id}`}
                    onClick={() => {
                      handleNavClick(section.path, section.id);
                      setMobileMenuOpen(false); // Close menu on click
                    }}
                    className={`flex items-center justify-center p-4 rounded-lg text-sm font-semibold transition-all duration-300
                    ${activeSection === section.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100/80 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-600/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <section.icon className="h-5 w-5 mr-2" />
                    {section.name}
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="absolute -top-2 -right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg">
                <XMarkIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Optional) */}
      <footer className="relative z-10 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Copyright &copy; {new Date().getFullYear()} Vijay Vidhya Sagar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
