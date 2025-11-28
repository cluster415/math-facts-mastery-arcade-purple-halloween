import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Difficulty, Operation } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';
import { 
  TrophyIcon, 
  CauldronIcon, 
  BatIcon,
} from './icons';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, operation: Operation) => void;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string | number;
  delay: number;
}> = ({ icon, value, delay }) => (
  <motion.div
    className="flex flex-col items-center w-1/3"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 + delay * 0.2 }}
  >
    <div className="relative w-full aspect-[4/3] bg-halloween-dark border-2 border-halloween-dark-border rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-lg"
         style={{
            borderImage: 'linear-gradient(to bottom, #4a4a52, #2a2a30) 1',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
         }}
    >
      <div className="text-halloween-purple mb-2 scale-125">{icon}</div>
      <div className="text-5xl md:text-6xl font-bold text-halloween-red" style={{ textShadow: '0 0 8px rgba(226, 78, 78, 0.7)'}}>{value}</div>
    </div>
  </motion.div>
);

const OperationSelector: React.FC<{
  selected: Operation;
  onSelect: (op: Operation) => void;
}> = ({ selected, onSelect }) => {
  const operations: { op: Operation; label: string; symbol: React.ReactNode | string }[] = [
    { op: Operation.Addition, label: 'Addition', symbol: '+' },
    { op: Operation.Subtraction, label: 'Subtraction', symbol: '−' },
    { op: Operation.Multiplication, label: 'Multiplication', symbol: '×' },
    { op: Operation.Division, label: 'Division', symbol: '÷' },
  ];

  return (
    <div className="p-2 rounded-xl flex justify-center items-center gap-2 sm:gap-3">
      {operations.map(({ op, label, symbol }) => (
        <button
          key={op}
          onClick={() => onSelect(op)}
          className={`relative w-28 h-28 rounded-lg flex flex-col justify-center items-center transition-all duration-200 border-4 transform hover:scale-105 hover:-translate-y-1 ${
            selected === op
              ? 'bg-halloween-yellow/10 text-white border-halloween-yellow shadow-glow-yellow'
              : 'bg-halloween-blue text-white border-blue-900 hover:border-blue-400'
          }`}
          aria-pressed={selected === op}
          aria-label={label}
        >
          <span className="text-4xl font-bold">{symbol}</span>
          <span className="text-xs uppercase font-sans tracking-wider mt-1">{op}</span>
        </button>
      ))}
    </div>
  );
};

const DifficultyCard: React.FC<{
  difficulty: Difficulty;
  onClick: () => void;
  isSelected: boolean;
}> = ({ difficulty, onClick, isSelected }) => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const { label, description, Icon, color, borderColor, shadow } = settings;

  return (
    <motion.button
      onClick={onClick}
      className={`relative rounded-md p-4 text-center w-full transition-all duration-300 border-4 bg-halloween-dark ${
        isSelected ? `scale-105 ${shadow} ${borderColor}` : `${borderColor}/50`
      }`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-center items-center mb-2">
        <Icon className={`w-10 h-10 ${color}`} />
      </div>
      <h3 className={`text-xl font-bold mb-1 ${color} font-sans uppercase`}>{label}</h3>
      <p className="text-white/60 text-sm font-sans">{description}</p>
       {/* design-fidelity: cracked border effect is simplified to a solid border */}
    </motion.button>
  );
};

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedOperation, setSelectedOperation] = useState<Operation>(Operation.Addition);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(Difficulty.Hard);

  const handleStartGame = () => {
    if (selectedDifficulty) {
      onStart(selectedDifficulty, selectedOperation);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-4 space-y-4 md:space-y-6">
      
      <motion.div 
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-7xl md:text-8xl font-display text-halloween-purple tracking-widest" style={{ textShadow: '0 0 10px rgba(161, 140, 255, 0.7)'}}>Math Facts</h1>
        <div className="px-6 py-2 bg-stone-800/70 rounded-md border-2 border-stone-600 shadow-lg -mt-2">
            <h2 className="text-4xl md:text-5xl font-display text-white tracking-wider">Mastery Arcade</h2>
        </div>
      </motion.div>

      <motion.div 
        className="w-full max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
          <h3 className="text-xl font-bold text-halloween-yellow mb-2 text-center tracking-wider font-sans">Select an Operation</h3>
          <OperationSelector selected={selectedOperation} onSelect={setSelectedOperation} />
      </motion.div>

      <motion.div 
        className="w-full max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
       >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(DIFFICULTY_SETTINGS) as Array<keyof typeof DIFFICULTY_SETTINGS>).map((level) => (
                  <DifficultyCard 
                    key={level} 
                    difficulty={level} 
                    isSelected={selectedDifficulty === level}
                    onClick={() => setSelectedDifficulty(level)} />
              ))}
          </div>
      </motion.div>

       <motion.div
        className="pt-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
            onClick={handleStartGame}
            disabled={!selectedDifficulty}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 24px rgba(153, 255, 176, 0.6)" }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-halloween-green text-halloween-dark font-bold rounded-lg shadow-lg text-2xl uppercase tracking-widest focus:outline-none focus-visible:ring-4 ring-offset-halloween-dark ring-offset-2 ring-halloween-yellow disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
            Start Game
        </motion.button>
      </motion.div>
      
      <div className="w-full max-w-2xl flex items-end justify-center gap-4 pt-4">
          <StatCard icon={<CauldronIcon className="w-8 h-8"/>} value="5" delay={1} />
          <StatCard icon={<TrophyIcon className="w-8 h-8"/>} value="4" delay={2} />
          <StatCard icon={<BatIcon className="w-8 h-8"/>} value="7" delay={3} />
      </div>
    </div>
  );
};

export default StartScreen;