import { create } from 'zustand';
import { GameState, Tile } from '../types/game';
import { generateBoard } from '../utils/boardGenerator';
import { checkMatch } from '../utils/matchChecker';

interface GameStore extends GameState {
  initGame: (level: number) => void;
  selectTile: (tile: Tile) => void;
  resetSelection: () => void;
  updateTime: () => void;
}

const INITIAL_TIME = 180; // 3 minutes

export const useGameStore = create<GameStore>((set, get) => ({
  tiles: [],
  score: 0,
  timeLeft: INITIAL_TIME,
  isGameOver: false,
  selectedTile: null,
  level: 1,

  initGame: (level: number) => {
    const tiles = generateBoard(level);
    set({
      tiles,
      score: 0,
      timeLeft: INITIAL_TIME,
      isGameOver: false,
      selectedTile: null,
      level,
    });
  },

  selectTile: (tile: Tile) => {
    const { selectedTile, tiles } = get();
    
    if (tile.isMatched) return;
    
    if (!selectedTile) {
      set({ selectedTile: tile });
      const newTiles = tiles.map(t => 
        t.id === tile.id ? { ...t, isSelected: true } : t
      );
      set({ tiles: newTiles });
    } else {
      if (selectedTile.id === tile.id) {
        set({ selectedTile: null });
        const newTiles = tiles.map(t => ({ ...t, isSelected: false }));
        set({ tiles: newTiles });
        return;
      }

      if (selectedTile.type === tile.type) {
        const canMatch = checkMatch(selectedTile, tile, tiles);
        if (canMatch) {
          const newTiles = tiles.map(t => 
            t.id === selectedTile.id || t.id === tile.id
              ? { ...t, isMatched: true, isSelected: false }
              : { ...t, isSelected: false }
          );
          set(state => ({
            tiles: newTiles,
            score: state.score + 10,
            selectedTile: null,
          }));
        } else {
          const newTiles = tiles.map(t => ({ ...t, isSelected: false }));
          set({ tiles: newTiles, selectedTile: null });
        }
      } else {
        const newTiles = tiles.map(t => ({ ...t, isSelected: false }));
        set({ tiles: newTiles, selectedTile: null });
      }
    }
  },

  resetSelection: () => {
    set(state => ({
      selectedTile: null,
      tiles: state.tiles.map(t => ({ ...t, isSelected: false })),
    }));
  },

  updateTime: () => {
    set(state => {
      const newTime = state.timeLeft - 1;
      const isGameOver = newTime <= 0 || state.tiles.every(t => t.isMatched);
      return {
        timeLeft: newTime,
        isGameOver: isGameOver,
      };
    });
  },
}));