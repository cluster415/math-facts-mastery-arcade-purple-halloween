export enum GamePhase {
  Start = 'start',
  Playing = 'playing',
  Result = 'result',
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum Operation {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
}

export interface Question {
  operand1: number;
  operand2: number;
  operation: Operation;
  correctAnswer: number;
  options: number[];
}
