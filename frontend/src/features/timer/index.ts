// Export components
export { default as Timer } from './components/Timer';
export { default as TimerSettings } from './components/TimerSettings';
export { default as TimerCircle } from './components/TimerCircle';

// Export slice and actions
export {
    timerSlice,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimeLeft,
    switchPhase,
} from './slices/timerSlice';
