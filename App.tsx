
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GamePhase, Difficulty, Operation } from './types';
import { 
  HIGH_SCORE_STORAGE_KEY, 
  XP_STORAGE_KEY,
  LEVEL_STORAGE_KEY,
  MUTE_STORAGE_KEY,
  XP_FOR_NEXT_LEVEL,
  XP_PER_CORRECT_ANSWER,
  CORRECT_SOUND_B64, 
  WRONG_SOUND_B64 
} from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import SpookyScenery from './components/SpookyScenery';


const App = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Start);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [operation, setOperation] = useState<Operation>(Operation.Multiplication);
  const [sessionScore, setSessionScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
    
    const savedXp = localStorage.getItem(XP_STORAGE_KEY);
    if (savedXp) setXp(parseInt(savedXp, 10));

    const savedLevel = localStorage.getItem(LEVEL_STORAGE_KEY);
    if (savedLevel) setLevel(parseInt(savedLevel, 10));

    const savedMuteState = localStorage.getItem(MUTE_STORAGE_KEY);
    setIsMuted(savedMuteState ? JSON.parse(savedMuteState) : false);
  }, []);

  const addXp = useCallback((amount: number) => {
    setXp(currentXp => {
      const newXp = currentXp + amount;
      if (Math.floor(newXp / XP_FOR_NEXT_LEVEL) > Math.floor(currentXp / XP_FOR_NEXT_LEVEL)) {
        setLevel(prevLevel => {
            const newLevel = prevLevel + 1;
            localStorage.setItem(LEVEL_STORAGE_KEY, newLevel.toString());
            return newLevel;
        });
      }
      localStorage.setItem(XP_STORAGE_KEY, newXp.toString());
      return newXp;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      localStorage.setItem(MUTE_STORAGE_KEY, JSON.stringify(newMutedState));
      return newMutedState;
    });
  }, []);

  const startGame = useCallback((selectedDifficulty: Difficulty, selectedOperation: Operation) => {
    setDifficulty(selectedDifficulty);
    setOperation(selectedOperation);
    setGamePhase(GamePhase.Playing);
  }, []);

  const endGame = useCallback((score: number) => {
    setSessionScore(score);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_STORAGE_KEY, score.toString());
    }
    setGamePhase(GamePhase.Result);
  }, [highScore]);

  const playAgain = useCallback(() => {
    setGamePhase(GamePhase.Start);
  }, []);
  
  const playSound = (type: 'correct' | 'wrong') => {
    if (isMuted) return;
    const audioRef = type === 'correct' ? correctAudioRef : wrongAudioRef;
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const screenVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-halloween-bg text-white font-sans flex flex-col items-center justify-start selection:bg-halloween-yellow selection:text-halloween-bg relative overflow-hidden">
      <SpookyScenery />
      <main className="w-full max-w-5xl mx-auto z-10 flex-grow flex flex-col justify-center p-4">
        <AnimatePresence mode="wait">
          {gamePhase === GamePhase.Start && (
            <motion.div key="start" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3}}>
              <StartScreen onStart={startGame} />
            </motion.div>
          )}
          {gamePhase === GamePhase.Playing && (
            <motion.div key="playing" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3}}>
              <GameScreen onEndGame={endGame} playSound={playSound} difficulty={difficulty} operation={operation} addXp={() => addXp(XP_PER_CORRECT_ANSWER)} />
            </motion.div>
          )}
          {gamePhase === GamePhase.Result && (
            <motion.div key="result" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3}}>
              <ResultScreen score={sessionScore} highScore={highScore} onPlayAgain={playAgain} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <audio ref={correctAudioRef} src={CORRECT_SOUND_B64} preload="auto"></audio>
      <audio ref={wrongAudioRef} src={WRONG_SOUND_B64} preload="auto"></audio>
    </div>
  );
};

export default App;