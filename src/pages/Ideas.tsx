import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlobeAltIcon, BeakerIcon, BookOpenIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { Variants } from 'framer-motion';

// TODO: Add these images to your `src/assets/ideas/` folder
import ideaAutoAi from '../assets/ideas/idea-autoai.png';
import ideaRegen from '../assets/ideas/idea-regen.png';
import ideaKnowledge from '../assets/ideas/idea-knowledge.png';
import ideaGuardian from '../assets/ideas/idea-guardian.png';

interface Idea {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ElementType;
  points: string[];
}

const ideas: Idea[] = [
  {
    id: 1,
    title: 'The Post-Scarcity World',
    description: 'Automate the world with AI, where all humans enjoy life with everything provided at no cost—from food and housing to education and healthcare—eliminating sadness, war, and hunger.',
    imageUrl: ideaAutoAi,
    icon: GlobeAltIcon,
    points: [
      'Universal Basic Services: AI-managed logistics ensure equitable resource distribution for all.',
      'A Creative Renaissance: Freed from labor, humanity can pursue arts, science, and personal growth.',
      'Ethical Governance: AI systems could model fair policies and help eliminate corruption.',
    ],
  },
  {
    id: 2,
    title: 'Planetary Regeneration',
    description: 'Deploy Earth-healing machines like nanobots and drones to clean oceans, regrow forests, capture carbon emissions, and perfect waste management.',
    imageUrl: ideaRegen,
    icon: BeakerIcon,
    points: [
      'Bio-Integrated Nanites: Nanobots that not only clean but also enrich soil and water ecosystems.',
      'Autonomous Reforestation: Swarms of drones planting billions of trees in deforested areas.',
      'Atmospheric Carbon Capture: Large-scale facilities that convert captured CO2 into stable materials.',
    ],
  },
  {
    id: 3,
    title: 'The Collective Consciousness',
    description: 'A universal, AI-powered knowledge system where any human can instantly learn anything in their own language, completely free of charge.',
    imageUrl: ideaKnowledge,
    icon: BookOpenIcon,
    points: [
      'Personalized Learning Paths: The AI adapts teaching methods to each individual\'s unique learning style.',
      'Instant Skill Acquisition: Neural interfaces could allow for direct knowledge and skill downloads.',
      'Breaking Language Barriers: Real-time, nuanced translation would foster unprecedented global unity.',
    ],
  },
  {
    id: 4,
    title: 'The Guardian Network',
    description: 'A single AI system that constantly monitors Earth, animals, and humans in one connected network. Diseases are predicted and cured before they even appear.',
    imageUrl: ideaGuardian,
    icon: ShieldCheckIcon,
    points: [
      'Predictive Health: Genetic markers and lifestyle data are analyzed to prevent illness proactively.',
      'Ecological Balance: The AI monitors biodiversity and ecosystem health, preventing extinctions.',
      'Disaster Prevention: The system can predict natural disasters with high accuracy, allowing for timely evacuations.',
    ],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const IdeaCard: React.FC<{ idea: Idea }> = React.memo(({ idea }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use a tap handler for mobile devices
  const handleTap = useCallback(() => {
    // This check ensures the tap-to-expand only works on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsExpanded(prev => !prev);
    }
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px] group cursor-pointer"
      onTap={handleTap}
    >
      <img
        src={idea.imageUrl}
        alt={idea.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        {/* The `isExpanded` class will only be applied on tap (mobile) */}
        <div className={`transform transition-transform duration-500 ease-out group-hover:-translate-y-4 ${isExpanded ? '-translate-y-4' : ''}`}>
          <idea.icon className="w-12 h-12 mb-4 text-white/80" />
          <h3 className="text-3xl md:text-4xl font-bold mb-3">{idea.title}</h3>
          <p className="text-base md:text-lg text-white/90 mb-6">{idea.description}</p>
        </div>
        {/* 
          This div is controlled by hover on desktop (`group-hover:*`)
          and by the `isExpanded` state on mobile.
        */}
        <div className={`transition-all duration-500 ease-in-out 
          opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen
          ${isExpanded ? 'opacity-100 max-h-screen' : ''}
        `}>
          <ul className="space-y-2 text-sm md:text-base">
            {idea.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 mt-1 text-blue-300 flex-shrink-0">&#10148;</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
});

const Ideas: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  return (
    <div className="p-4 md:p-8">
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Visions for a Better Future
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A collection of ambitious ideas where technology and artificial intelligence are harnessed for the betterment of humanity and our planet.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </motion.div>
    </div>
  );
};

export default Ideas;