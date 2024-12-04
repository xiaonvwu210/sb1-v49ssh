import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tile as TileComponent } from './Tile';
import { MatchEffect } from './MatchEffect';
import { useGameStore } from '../store/gameStore';
import { HERB_DATA } from '../types/herbs';

export const GameBoard: React.FC = () => {
  const { tiles, selectTile, timeLeft, score, isGameOver, initGame } = useGameStore();
  const [matchEffect, setMatchEffect] = useState<{ herb: string; position: { x: number; y: number } } | null>(null);

  useEffect(() => {
    initGame(1);
    const timer = setInterval(() => {
      useGameStore.getState().updateTime();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTileSelect = (tile: any) => {
    selectTile(tile);
    if (tile.isMatched) {
      const tileElement = document.getElementById(`tile-${tile.id}`);
      if (tileElement) {
        const rect = tileElement.getBoundingClientRect();
        setMatchEffect({
          herb: tile.type,
          position: { x: rect.left, y: rect.top }
        });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#f5e6d3]"
    >
      <div className="mb-4 flex gap-8">
        <div className="text-xl font-bold text-red-800">Time: {formatTime(timeLeft)}</div>
        <div className="text-xl font-bold text-red-800">Score: {score}</div>
      </div>
      
      <div className="grid grid-cols-8 gap-1 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
        {tiles.map((tile) => (
          <TileComponent
            key={tile.id}
            tile={tile}
            onSelect={handleTileSelect}
          />
        ))}
      </div>

      {matchEffect && (
        <MatchEffect
          herb={HERB_DATA[matchEffect.herb]}
          position={matchEffect.position}
          onComplete={() => setMatchEffect(null)}
        />
      )}

      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-2xl font-bold text-red-800"
        >
          {tiles.every(t => t.isMatched) ? '恭喜过关！' : '游戏结束！'}
        </motion.div>
      )}
    </motion.div>
  );
};