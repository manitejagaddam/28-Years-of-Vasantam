import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import CelebrationPage from './pages/CelebrationPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'celebration'>('welcome');

  const navigateToCelebration = () => {
    setCurrentPage('celebration');
  };

  const navigateToWelcome = () => {
    setCurrentPage('welcome');
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <WelcomePage key="welcome" onEnterClick={navigateToCelebration} />
        )}
        {currentPage === 'celebration' && (
          <CelebrationPage key="celebration" onCelebrateAgain={navigateToWelcome} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;