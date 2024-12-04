import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HerbInfo } from '../types/herbs';

interface MatchEffectProps {
  herb: HerbInfo;
  position: { x: number; y: number };
  onComplete: () => void;
}

export const MatchEffect: React.FC<MatchEffectProps> = ({ herb, position, onComplete }) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: -50 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="fixed pointer-events-none text-center"
        style={{ left: position.x, top: position.y }}
      >
        <div className="text-2xl font-bold text-red-800">{herb.chinese}</div>
        <div className="text-lg text-gray-700">{herb.english}</div>
      </motion.div>
    </AnimatePresence>
  );
};