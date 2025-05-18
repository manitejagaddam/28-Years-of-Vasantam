import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';
import { quotes } from '../data/quotes';
import { images } from '../data/images';
import ParticleBackground from '../components/ParticleBackground';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1997',
    title: 'The Day It All Began',
    description: 'The day our lives changed forever. Surrounded by love and blessings, we promised each other forever in a beautiful ceremony.',
    image: images[0],
  },
  {
    year: '1998',
    title: 'Our First Anniversary',
    description: '365 days of laughter, learning, late-night talks, and quiet moments. Our love felt stronger and our bond deeper.',
    image: images[1],
  },
  {
    year: '2001',
    title: 'Building Our Nest',
    description: 'We spent these early years dreaming, working, and laying the foundation for the beautiful family we were about to become.',
    image: images[2],
  },
  {
    year: '2005',
    title: 'The Day Our World Changed',
    description: 'The moment we held you in our arms for the first time, everything changed. You filled our lives with love, purpose, and a kind of joy we never knew existed.',
    image: images[3],
  },
  {
    year: '2007',
    title: 'A Decade of Us',
    description: 'Ten years, countless memories. Through every smile and every tear, we stood strong — hand in hand.',
    image: images[4],
  },
  {
    year: '2013',
    title: 'Family, Laughter & Legacy',
    description: 'Our home echoed with laughter. Watching our kids grow, learning from each other — every day felt like a gift.',
    image: images[5],
  },
  {
    year: '2018',
    title: 'A New Chapter: Our Dream Home',
    description: 'We built a home, not just with bricks, but with love, laughter, and dreams stitched into every corner.',
    image: images[6],
  },
  {
    year: '2022',
    title: 'Silver Jubilee of Love',
    description: '25 years of togetherness — of growing, learning, and still looking at each other with the same love in our eyes.',
    image: images[7],
  },
  {
    year: '2025',
    title: '28 Years of Forever',
    description: 'Today we celebrate a journey full of love, shared dreams, and a life crafted together — beautifully, tenderly, endlessly.',
    image: images[8],
  },
];


interface CelebrationPageProps {
  onCelebrateAgain: () => void;
}

const CelebrationPage: React.FC<CelebrationPageProps> = ({ onCelebrateAgain }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCelebrateHovered, setIsCelebrateHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCelebrateAgain = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onCelebrateAgain();
      setShowConfetti(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-hidden"
    >
      <ParticleBackground />

      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 0.3 : 0,
              scale: currentImageIndex === index ? 1.1 : 1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={['#f9a8d4', '#fcd34d', '#7dd3fc', '#ffffff', '#f472b6']}
        />
      )}

      <div className="relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-6 px-4 text-center backdrop-blur-sm bg-white/30"
        >
          <h1 className="text-4xl md:text-6xl font-dancing font-bold text-primary-600">
            Our Journey Through Time
          </h1>
          <p className="mt-2 font-playfair text-lg text-gray-800">
            28 Years of Love, Laughter, and Beautiful Memories
          </p>
        </motion.header>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl"
                    >
                      <div className="text-primary-500 mb-2">
                        <Heart className="inline-block animate-heart-pulse" size={24} fill="#ec4899" />
                      </div>
                      <h3 className="text-2xl font-dancing font-bold text-primary-600 mb-1">
                        {event.year}
                      </h3>
                      <h4 className="text-xl font-playfair font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray-600">{event.description}</p>
                      <div className="mt-4 italic text-sm text-gray-500">
                        "{quotes[index % quotes.length]}"
                      </div>
                    </motion.div>
                  </div>
                  <div className="w-1/2 px-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-1/2 h-24 w-px bg-primary-300 -bottom-24 transform -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center py-12"
        >
          <motion.button
            className={`relative bg-primary-500 hover:bg-primary-600 text-white font-dancing text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 ${
              isCelebrateHovered ? 'pl-12' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrateAgain}
            onMouseEnter={() => setIsCelebrateHovered(true)}
            onMouseLeave={() => setIsCelebrateHovered(false)}
          >
            {isCelebrateHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              >
                <Heart className="animate-heart-pulse" size={20} fill="#ffffff" />
              </motion.div>
            )}
            Celebrate Again
          </motion.button>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="py-4 text-center text-gray-600 font-playfair text-sm backdrop-blur-sm bg-white/30"
        >
          <p>Made with ❤️ for Mom & Dad's 28th Anniversary</p>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default CelebrationPage;