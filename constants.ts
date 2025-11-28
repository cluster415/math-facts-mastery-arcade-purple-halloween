import { Difficulty } from './types';
import { SkullIcon, GhostIcon, LightningIcon } from './components/icons';

export const XP_PER_CORRECT_ANSWER = 10;
export const XP_FOR_NEXT_LEVEL = 100;

export const HIGH_SCORE_STORAGE_KEY = 'mma_highScore_v2';
export const XP_STORAGE_KEY = 'mma_xp_v2';
export const LEVEL_STORAGE_KEY = 'mma_level_v2';
export const MUTE_STORAGE_KEY = 'mma_muted_v2';


export const DIFFICULTY_SETTINGS = {
  [Difficulty.Easy]: {
    label: 'Easy',
    // FIX: Corrected typo in description and added range/duration
    description: 'Numbers up to 9 - 60 sec',
    Icon: SkullIcon,
    color: 'text-halloween-purple',
    bgColor: 'bg-halloween-purple/10',
    borderColor: 'border-halloween-purple',
    shadow: 'shadow-glow-purple',
    range: { max: 9 },
    duration: 60,
  },
  [Difficulty.Medium]: {
    label: 'Medium',
    description: 'Numbers up to 13 - 60 sec',
    Icon: GhostIcon,
    color: 'text-halloween-purple',
    bgColor: 'bg-halloween-purple/10',
    borderColor: 'border-halloween-purple',
    shadow: 'shadow-glow-purple',
    // FIX: Added range/duration
    range: { max: 13 },
    duration: 60,
  },
  [Difficulty.Hard]: {
    label: 'Hard',
    description: 'Numbers up to 15 - 65 sec',
    Icon: LightningIcon,
    color: 'text-halloween-red',
    bgColor: 'bg-halloween-red/10',
    borderColor: 'border-halloween-red',
    shadow: 'shadow-glow-red',
    // FIX: Added range/duration
    range: { max: 15 },
    duration: 65,
  },
};

// Simple "ding" sound for correct answers
export const CORRECT_SOUND_B64 = "data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEAESsAAESsAAABAAgAZGF0YVgAAAAA8/8/8P/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wP/A/8A==";

// Simple "buzz" sound for incorrect answers
export const WRONG_SOUND_B64 = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAUSsAAEYBAAABAAgAZGF0YQAAAAAAMP9A/0D/QP9A/0D/QP9A/0D/QP9A/0D/QP9A/0D/QP9A/0D/QP9A/w==";