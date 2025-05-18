import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, subtitle }) => {
  const titleWords = title.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-2 mb-2 text-4xl md:text-6xl lg:text-7xl font-dancing font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
      
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-2 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-dancing font-bold text-secondary-500"
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedTitle;