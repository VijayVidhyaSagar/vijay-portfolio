import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ASCIITextComponent from '../components/TextAnimation';
import RainingEffectComponent from '../components/RainingEffect';

const RainingEffect = React.memo(RainingEffectComponent);
const ASCIIText = React.memo(ASCIITextComponent);

const Home: React.FC = () => {
  return (
    // This div acts as the full-page "card".
    // 'fixed inset-0' makes it cover the entire viewport.
    // 'flex items-center justify-center' will center the content.
    <div className="h-full w-full fixed inset-0 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <RainingEffect />
      <ASCIIText />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        >
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <span className="sm:hidden">Explore More</span>
            <span className="hidden sm:inline">Explore More About Me</span>
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;