import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedTitle from '../components/AnimatedTitle';

interface WelcomePageProps {
  onEnterClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterClick }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Show confetti after a delay when the page loads
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleEnterClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onEnterClick();
    }, 1000);
  };

  const floatingHeartVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={['#f9a8d4', '#fcd34d', '#7dd3fc', '#ffffff', '#f472b6']}
          confettiSource={{ x: windowSize.width / 2, y: -20, w: 0, h: 0 }}
        />
      )}

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial="initial"
            animate="animate"
            variants={floatingHeartVariants}
            transition={{
              duration: 0.5,
              delay: 1 + index * 0.2,
              ease: 'easeOut',
            }}
          >
            <div
              className="animate-heart-float text-primary-400 opacity-70"
              style={{
                animationDelay: `${index * 0.5}s`,
                transform: `scale(${0.5 + Math.random() * 1})`,
              }}
            >
              <Heart size={40} fill="#f472b6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="z-10 text-center px-4">
        <AnimatedTitle title="Happy 28th Anniversary" subtitle="Mom & Dad!" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-12"
        >
          <motion.button
            className={`relative bg-primary-500 hover:bg-primary-600 text-white font-dancing text-2xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 ${
              isButtonHovered ? 'pl-12' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterClick}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isButtonHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              >
                <Heart className="animate-heart-pulse" size={24} fill="#ffffff" />
              </motion.div>
            )}
            Celebrate With Us
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 text-center w-full text-gray-500 font-playfair text-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>A tribute to 28 beautiful years of love and togetherness</p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;