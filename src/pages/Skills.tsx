import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, AcademicCapIcon, ServerStackIcon, CloudIcon, CommandLineIcon, CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline';

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: string[];
  theme: keyof typeof colorThemes;
}

const colorThemes = {
  blue: {
    card: 'bg-blue-50/50 dark:bg-blue-900/30 border-blue-200/50 dark:border-blue-800/50',
    icon: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/20',
  },
  teal: {
    card: 'bg-teal-50/50 dark:bg-teal-900/30 border-teal-200/50 dark:border-teal-800/50',
    icon: 'text-teal-600 dark:text-teal-400',
    shadow: 'shadow-teal-500/20',
  },
  indigo: {
    card: 'bg-indigo-50/50 dark:bg-indigo-900/30 border-indigo-200/50 dark:border-indigo-800/50',
    icon: 'text-indigo-600 dark:text-indigo-400',
    shadow: 'shadow-indigo-500/20',
  },
};

const badgeThemes = [
  { badge: 'bg-sky-100/80 dark:bg-sky-900/40 text-sky-800 dark:text-sky-100', icon: 'text-sky-600 dark:text-sky-400' },
  { badge: 'bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-100', icon: 'text-emerald-600 dark:text-emerald-400' },
  { badge: 'bg-rose-100/80 dark:bg-rose-900/40 text-rose-800 dark:text-rose-100', icon: 'text-rose-600 dark:text-rose-400' },
  { badge: 'bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-100', icon: 'text-amber-600 dark:text-amber-400' },
  { badge: 'bg-violet-100/80 dark:bg-violet-900/40 text-violet-800 dark:text-violet-100', icon: 'text-violet-600 dark:text-violet-400' },
];

const proficientBadgeThemes = [
  { star: 'text-yellow-400/70 dark:text-yellow-500/70', text: 'text-green-900 dark:text-green-50' },
  { star: 'text-cyan-400/70 dark:text-cyan-500/70', text: 'text-cyan-900 dark:text-cyan-100' },
  { star: 'text-lime-400/70 dark:text-lime-500/70', text: 'text-lime-900 dark:text-lime-100' },
  { star: 'text-pink-400/70 dark:text-pink-500/70', text: 'text-pink-900 dark:text-pink-100' },
  { star: 'text-orange-400/70 dark:text-orange-500/70', text: 'text-orange-900 dark:text-orange-100' },
  { star: 'text-purple-400/70 dark:text-purple-500/70', text: 'text-purple-900 dark:text-purple-100' }
];

const proficientSkills = new Set([
  'Python (Mastery)',
  'Automation',
  'Prompt Engineering',
  'Adaptive Learning',
  'GitHub Copilot',
  'GCP BigQuery',
  'SQL',
  'Snowflake',
  'Teradata',
  'Google Cloud Platform',
  'Git',
  'Jira',
  'BMC Control-M',
  'Service-Now.com',
  'Data Visualization',
]);

const skillCategories: SkillCategory[] = [
  {
    name: 'Gen AI',
    icon: CodeBracketIcon,
    skills: ['Automation', 'Prompt Engineering', 'Cross Skilling with Gen AI', 'Adaptive Learning', 'GitHub Copilot', 'OpenAI - ChatGPT', 'Gemini Code Assistant'],
    theme: 'blue',
  },
  {
    name: 'Data Engineering',
    icon: ServerStackIcon,
    skills: ['GCP BigQuery', 'Python libraries/frameworks', 'Java', 'SQL', 'Snowflake', 'Teradata'],
    theme: 'teal',
  },
  {
    name: 'Programming Languages',
    icon: CodeBracketIcon,
    skills: ['Python (Mastery)', 'Java', 'C', 'C++'],
    theme: 'indigo',
  },
  {
    name: 'Cloud & DevOps',
    icon: CloudIcon,
    skills: ['Google Cloud Platform', 'AWS', 'Azure', 'Linux', 'Docker', 'Git', 'CI/CD'],
    theme: 'indigo',
  },
  {
    name: 'Tools & Others',
    icon: CommandLineIcon,
    skills: ['Jira', 'BMC Control-M', 'Service-Now.com', 'Teradata-Tools and Utilities', 'Operating Systems', 'MS Office', 'VS Code', 'Figma' , 'Data Analysis', 'Data Visualization' ],
    theme: 'blue',
  },
  {
    name: 'Frontend Development (With Gen AI)',
    icon: CodeBracketIcon,
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion', 'Material UI', 'Next.js'],
    theme: 'blue',
  },
  {
    name: 'Backend & Database Development (With Gen AI)',
    icon: CodeBracketIcon,
    skills: ['Python', 'Flask', 'Django', 'MySQL', 'MongoDB', 'PostgreSQL'],
    theme: 'teal',
  },
  {
    name: 'Learning & Exploring',
    icon: AcademicCapIcon,
    skills: ['AI Agent', 'Quantum Computing' , 'Machine Learning', 'AI/ML Ops', 'Rust', 'Blockchain', 'Game Development'],
    theme: 'teal',
  },
];

// A small, reusable component for the skill "pills" or "badges"
const SkillBadge: React.FC<{
  skill: string;
  index: number;
  baseDelay: number;
}> = ({ skill, index, baseDelay }) => {
  const isProficient = proficientSkills.has(skill);
  const regularTheme = badgeThemes[index % badgeThemes.length];

  if (isProficient) {
    const proficientTheme = proficientBadgeThemes[index % proficientBadgeThemes.length];
    return (
      <motion.li
        className={`relative flex items-center justify-center p-4 text-sm font-bold ${proficientTheme.text}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: baseDelay + index * 0.05, type: 'spring', stiffness: 300, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        title={`${skill} (Proficient)`}
      >
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8 + index * 2, // Vary the speed slightly for each star
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <StarIcon className={`h-16 w-16 ${proficientTheme.star}`} fill="currentColor" />
        </motion.div>
        <span className="relative z-10">{skill}</span>
      </motion.li>
    );
  }

  return (
    <motion.li
      className={`flex items-center py-2 px-4 rounded-full text-sm font-medium shadow-sm transition-colors duration-200 ${regularTheme.badge}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: baseDelay + index * 0.05 }}
      whileHover={{ scale: 1.08, y: -2 }}
      style={{ willChange: 'transform' }}
    >
      <CheckBadgeIcon className={`h-4 w-4 mr-2 ${regularTheme.icon}`} />
      {skill}
    </motion.li>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="p-4 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">My Skills & Expertise</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => {
          const theme = colorThemes[category.theme] || colorThemes.blue;
          return (
            <motion.div
              key={category.name}
              className={`p-6 rounded-2xl shadow-md border transition-all duration-300 ${theme.card}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: `0px 20px 40px -10px var(--tw-shadow-color)`,
              }}
              style={{ '--tw-shadow-color': theme.shadow } as React.CSSProperties}
            >
              <div className="flex items-center mb-4">
                <category.icon className={`h-8 w-8 mr-3 ${theme.icon}`} aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{category.name}</h2>
              </div>
              <ul className="flex flex-wrap gap-3 items-center">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge 
                    key={skill} 
                    skill={skill} 
                    index={skillIndex} 
                    baseDelay={index * 0.1}
                  />
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;