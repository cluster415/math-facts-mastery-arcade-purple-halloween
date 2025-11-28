
import React from 'react';
import { motion } from 'framer-motion';

interface ResultScreenProps {
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, highScore, onPlayAgain }) => {
  const isNewHighScore = score > 0 && score === highScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col items-center justify-center text-center p-8 bg-halloween-dark/80 backdrop-blur-sm rounded-lg shadow-panel border border-halloween-dark-border max-w-lg mx-auto"
    >
      <h2 className="text-4xl font-bold mb-4 text-halloween-purple font-display tracking-wider">Time's Up!</h2>
      
      {isNewHighScore && (
         <motion.div 
            initial={{ scale: 0, rotate: -15 }} 
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="my-4 px-4 py-2 bg-halloween-yellow/20 border-2 border-halloween-yellow rounded-lg"
        >
            <p className="font-bold text-halloween-yellow text-2xl">New High Score!</p>
        </motion.div>
      )}

      <p className="text-2xl mt-4 mb-2 font-sans">Your Final Score:</p>
      <motion.p 
        initial={{ scale: 0.5, opacity: 0}}
        animate={{ scale: 1, opacity: 1}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="text-8xl font-bold text-white mb-8"
      >
        {score}
      </motion.p>
      
      <p className="text-xl mb-8 font-sans">High Score: <span className="font-bold text-halloween-yellow text-2xl">{highScore}</span></p>

      <motion.button
        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 24px rgba(153, 255, 176, 0.6)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onPlayAgain}
        className="px-8 py-4 bg-green-700 text-white font-bold rounded-lg shadow-lg text-2xl uppercase tracking-widest focus:outline-none focus-visible:ring-4 ring-offset-halloween-dark ring-offset-2 ring-halloween-yellow"
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};

export default ResultScreen;