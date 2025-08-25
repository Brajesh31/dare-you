
import React from 'react';
import { motion } from 'framer-motion';

interface GameIntroProps {
  title: string;
  subtitle: string;
}

const GameIntro = ({ title, subtitle }: GameIntroProps) => {
  return (
    <div className="text-center mb-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.05, rotateX: 5 }}
          style={{ perspective: 1000 }}
        >
          {title}
        </motion.h1>
        <div className="absolute inset-0 bg-black bg-opacity-10 blur-lg -z-10"></div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg text-gray-300"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default GameIntro;
