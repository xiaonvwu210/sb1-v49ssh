import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Tile as TileType } from '../types/game';
import { HERB_DATA } from '../types/herbs';

interface TileProps {
  tile: TileType;
  onSelect: (tile: TileType) => void;
}

export const Tile: React.FC<TileProps> = ({ tile, onSelect }) => {
  const herbInfo = HERB_DATA[tile.type];

  const handleClick = () => {
    if (!tile.isMatched) {
      onSelect(tile);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: tile.isMatched ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={classNames(
        'w-16 h-16 border-2 rounded-lg flex items-center justify-center cursor-pointer',
        {
          'bg-white/80': !tile.isMatched && !tile.isSelected,
          'bg-yellow-200/80': tile.isSelected,
          'hover:bg-gray-100/80': !tile.isMatched && !tile.isSelected,
        }
      )}
      onClick={handleClick}
    >
      {!tile.isMatched && (
        <img 
          src={herbInfo.image} 
          alt={herbInfo.chinese}
          className="w-12 h-12 object-contain"
        />
      )}
    </motion.div>
  );
};