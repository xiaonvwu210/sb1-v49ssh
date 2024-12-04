export interface Tile {
  id: number;
  type: string;
  x: number;
  y: number;
  isSelected: boolean;
  isMatched: boolean;
}

export interface GameState {
  tiles: Tile[];
  score: number;
  timeLeft: number;
  isGameOver: boolean;
  selectedTile: Tile | null;
  level: number;
}

export interface Point {
  x: number;
  y: number;
}