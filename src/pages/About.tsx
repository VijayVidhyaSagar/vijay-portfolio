import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { BriefcaseIcon, CpuChipIcon, ArrowTrendingUpIcon, CodeBracketIcon, CloudIcon, CircleStackIcon, CogIcon, ArrowDownTrayIcon, EyeIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import profileImage from '../assets/Vijay.jpg'; // Make sure to add a profile image to your assets folder

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const philosophyCards = [
  {
    icon: ArrowTrendingUpIcon,
    title: 'Data-Driven Decisions',
    description: 'I believe the best solutions are built on clean, reliable data. My goal is to empower teams by making data not just available, but understandable and actionable.',
  },
  {
    icon: CpuChipIcon,
    title: 'Automation First',
    description: 'I strive to automate repetitive tasks to boost efficiency, reduce errors, and free up valuable time for innovation. If a process can be automated, it should be.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Continuous Learning',
    description: 'The world of data is constantly evolving. I am committed to staying at the forefront of technology, exploring new tools like Gen AI, and honing my skills for future challenges.',
  },
];

const whatIDoItems = [
  { icon: CodeBracketIcon, text: 'Python Programming, ETL & Data Pipelines' },
  { icon: CloudIcon, text: 'Cloud Data Platforms (GCP, Snowflake)' },
  { icon: CogIcon, text: 'Process Automation & Tooling' },
  { icon: CircleStackIcon, text: 'Database & Management' },
];

const journeyItems = [
  {
    year: '2022-Present (LTIMindtree)',
    title: 'Data Engineering & Automation',
    description: 'Focused on Snowflake and Teradata platforms, automating DBA tasks, engineering data ingestion pipelines, and developing custom applications to enhance operational efficiency.',
  },
  {
    year: '2022 (Academic Project)',
    title: 'Full-Stack Development with Gen AI',
    description: 'Designed and developed a full-stack e-commerce model for agricultural products, building a RESTful API and a responsive user interface to connect farmers with consumers.',
  },
  {
    year: 'Education',
    title: 'Foundation in Computer Science and Engineering',
    description: 'Built a strong foundation in programming, data structures, and algorithms, which sparked my passion for solving complex problems with technology. Graduated with a Bachelor of Engineering in Computer Science.',
  },
];

const About: React.FC = () => {
  return (
    <motion.div
      className="p-4 md:p-8 space-y-16 text-gray-800 dark:text-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Header Section --- */}
      <motion.section variants={itemVariants} className="text-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white/50 dark:border-gray-700/50"
        />
        <h1 className="text-4xl md:text-5xl font-bold">Vijay Vidhya Sagar</h1>
        <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mt-2">
          Data Engineer | Automation Engineer | Gen AI Enthusiast
        </p>
        <p className="max-w-3xl mx-auto mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300">
          I am a passionate and detail-oriented Data Engineer with a knack for transforming complex data into actionable insights. My journey in tech is driven by a relentless curiosity and a firm belief in the power of automation and intelligent systems to solve real-world problems.
        </p>
      </motion.section>

      {/* --- My Philosophy Section --- */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-center mb-10">My Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {philosophyCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-center"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <card.icon className="w-12 h-12 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- What I Do Section --- */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What I Do</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {whatIDoItems.map((item, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-md backdrop-blur-sm">
              <item.icon className="w-10 h-10 mx-auto mb-3 text-teal-500 dark:text-teal-400" />
              <span className="font-medium text-sm md:text-base">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* --- My Journey Section --- */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <div className="relative max-w-2xl mx-auto">
          {/* The vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-blue-300 dark:bg-blue-800" />

          {journeyItems.map((item, index) => (
            <div key={index} className={`relative flex items-start mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Dot on the timeline */}
              <div className="absolute left-4 top-1.5 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 -translate-x-1/2" />
              
              <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{item.year}</p>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* --- Call to Action Section --- */}
      <motion.section variants={itemVariants} className="text-center pt-8">
        <h2 className="text-3xl font-bold mb-4">Let's Build Something Great</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
          I'm always excited to connect with fellow professionals and explore new opportunities. Feel free to browse my projects or get in touch!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/skills"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            View My Skills & Expertise
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            View My Work
          </Link>
          <a
            href="/resume/vijay_resume.pdf" // TODO: Update with the actual path to your resume
            download
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download Resume
          </a>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.7)',
                '0 0 0 10px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-lg"
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;