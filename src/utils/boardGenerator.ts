import { Tile } from '../types/game';
import { HERB_DATA } from '../types/herbs';

const HERBS = Object.keys(HERB_DATA);

export const generateBoard = (level: number): Tile[] => {
  const width = 8;
  const height = 8;
  const tiles: Tile[] = [];
  const totalPairs = (width * height) / 2;
  
  // Create pairs of herbs
  const herbPairs = [];
  for (let i = 0; i < totalPairs; i++) {
    const herb = HERBS[i % HERBS.length];
    herbPairs.push(herb, herb);
  }

  // Shuffle the pairs
  for (let i = herbPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [herbPairs[i], herbPairs[j]] = [herbPairs[j], herbPairs[i]];
  }

  // Create tiles
  let id = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({
        id: id++,
        type: herbPairs[y * width + x],
        x,
        y,
        isSelected: false,
        isMatched: false,
      });
    }
  }

  return tiles;
};