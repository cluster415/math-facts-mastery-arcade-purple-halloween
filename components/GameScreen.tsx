
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Difficulty, Operation } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';
import { ClockIcon, StarIcon } from './icons';

interface GameScreenProps {
  onEndGame: (score: number) => void;
  playSound: (type: 'correct' | 'wrong') => void;
  difficulty: Difficulty;
  operation: Operation;
  addXp: () => void;
}

// design-fidelity: confetti is simplified to a pulse animation on the score for now
const ConfettiLayer = ({ isCelebrating }: { isCelebrating: boolean }) => {
  if (!isCelebrating) return null;
  return null; // Placeholder
};

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const generateQuestion = (difficulty: Difficulty, operation: Operation): Question => {
  const { range } = DIFFICULTY_SETTINGS[difficulty];
  const { max } = range;
  let operand1 = 0;
  let operand2 = 0;
  let correctAnswer = 0;

  switch (operation) {
    case Operation.Addition:
      operand1 = Math.floor(Math.random() * max) + 1;
      operand2 = Math.floor(Math.random() * max) + 1;
      correctAnswer = operand1 + operand2;
      break;
    case Operation.Subtraction: {
      let a = Math.floor(Math.random() * max) + 1;
      let b = Math.floor(Math.random() * max) + 1;
      if (a === b) { a > 1 ? (b -= 1) : (a += 1); }
      operand1 = Math.max(a, b);
      operand2 = Math.min(a, b);
      correctAnswer = operand1 - operand2;
      break;
    }
    case Operation.Multiplication:
      operand1 = Math.floor(Math.random() * max) + 1;
      operand2 = Math.floor(Math.random() * max) + 1;
      correctAnswer = operand1 * operand2;
      break;
    case Operation.Division: {
      const quotient = Math.floor(Math.random() * max) + 1;
      operand2 = Math.floor(Math.random() * (max - 1)) + 2;
      operand1 = operand2 * quotient;
      correctAnswer = quotient;
      break;
    }
    default:
        throw new Error(`Unsupported operation: ${operation}`);
  }
  
  const distractors = new Set<number>();
  while (distractors.size < 3) {
    const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = correctAnswer + offset;
    if (candidate > 0 && candidate !== correctAnswer) {
      distractors.add(candidate);
    }
  }
  const options = shuffle([correctAnswer, ...Array.from(distractors)]);
  return { operand1, operand2, operation, correctAnswer, options };
};

const GameScreen: React.FC<GameScreenProps> = ({ onEndGame, playSound, difficulty, operation, addXp }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_SETTINGS[difficulty].duration);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const isAnswered = selectedAnswer !== null;

  useEffect(() => {
    setQuestions(Array.from({ length: 100 }, () => generateQuestion(difficulty, operation)));
    setCurrentIndex(0);
  }, [difficulty, operation]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEndGame(scoreRef.current);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onEndGame]);
  
  const handleAnswer = (answer: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);

    const isCorrect = answer === currentQuestion?.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 10);
      addXp();
      playSound('correct');
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 500);
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
      } else {
        onEndGame(scoreRef.current);
      }
    }, 1200);
  };

  const currentQuestion = questions[currentIndex];

  const operationSymbols: Record<Operation, string> = {
    [Operation.Addition]: '+',
    [Operation.Subtraction]: '−',
    [Operation.Multiplication]: '×',
    [Operation.Division]: '÷',
  };

  return (
    <div className="relative p-8 bg-halloween-dark/80 backdrop-blur-sm rounded-lg shadow-panel border border-halloween-dark-border max-w-4xl mx-auto flex flex-col items-center">
      <ConfettiLayer isCelebrating={isCelebrating} />
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center text-2xl font-bold bg-black/40 p-3 rounded-lg">
            <StarIcon className="w-8 h-8 text-halloween-yellow mr-3"/>
             <motion.span animate={{ scale: isCelebrating ? 1.2 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>{score}</motion.span>
          </div>
          <div className="flex items-center text-2xl font-bold bg-black/40 p-3 rounded-lg justify-end">
            <span className={timeLeft <= 10 ? 'text-halloween-red' : ''}>{timeLeft}s</span>
            <ClockIcon className={`w-8 h-8 ml-3 ${timeLeft <= 10 ? 'text-halloween-red' : 'text-halloween-purple'}`}/>
          </div>
      </div>

      <div className="text-center my-8 flex items-center justify-center w-full h-40 bg-black/40 rounded-lg">
        {currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-wider"
            >
              {currentQuestion.operand1} {operationSymbols[currentQuestion.operation]} {currentQuestion.operand2}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
        {currentQuestion?.options.map((option) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === option;
            
            let state = 'default';
            if (isAnswered) {
                if (isCorrect) state = 'correct';
                else if (isSelected && !isCorrect) state = 'incorrect';
                else state = 'disabled';
            }

            return (
                <AnswerButton 
                    key={option} 
                    value={option} 
                    state={state} 
                    onClick={() => handleAnswer(option)}
                />
            )
        })}
      </div>
    </div>
  );
};

// --- AnswerButton Component ---
const AnswerButton: React.FC<{
  value: number;
  state: 'default' | 'correct' | 'incorrect' | 'disabled';
  onClick: () => void;
}> = ({ value, state, onClick }) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stateClasses = {
    default: "bg-halloween-blue border-blue-900 hover:scale-105 active:scale-95 text-white hover:border-blue-400",
    correct: "bg-green-600 border-green-300 scale-110 shadow-lg text-white",
    incorrect: "bg-halloween-red border-red-300 animate-shake text-white",
    disabled: "bg-halloween-dark border-halloween-dark-border opacity-50 cursor-not-allowed text-white/50",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={state !== 'default'}
      className={`w-full aspect-square rounded-full flex items-center justify-center text-4xl font-bold border-4 transform transition-all duration-200 focus:outline-none focus-visible:ring-4 ring-offset-halloween-dark ring-offset-2 ring-halloween-yellow ${stateClasses[state]}`}
      whileHover={state === 'default' ? { scale: 1.05 } : {}}
      whileTap={state === 'default' ? { scale: 0.98 } : {}}
      animate={state === 'incorrect' && !reducedMotion ? { x: [-8, 8, -8, 0] } : {}}
      transition={{ type: 'spring', stiffness: 800, damping: 10, duration: 0.3 }}
    >
      {value}
    </motion.button>
  );
};


export default GameScreen;