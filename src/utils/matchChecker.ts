import { Tile, Point } from '../types/game';

const isValidPath = (start: Point, end: Point, tiles: Tile[]): boolean => {
  // Check direct path
  if (canConnect(start, end, tiles)) {
    return true;
  }

  // Check one corner
  for (let x = 0; x < 8; x++) {
    const corner1: Point = { x, y: start.y };
    const corner2: Point = { x, y: end.y };
    
    if (canConnect(start, corner1, tiles) && 
        canConnect(corner1, end, tiles)) {
      return true;
    }
  }

  for (let y = 0; y < 8; y++) {
    const corner1: Point = { x: start.x, y };
    const corner2: Point = { x: end.x, y };
    
    if (canConnect(start, corner1, tiles) && 
        canConnect(corner1, end, tiles)) {
      return true;
    }
  }

  return false;
};

const canConnect = (start: Point, end: Point, tiles: Tile[]): boolean => {
  if (start.x === end.x) {
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    
    for (let y = minY + 1; y < maxY; y++) {
      if (tiles.some(t => !t.isMatched && t.x === start.x && t.y === y)) {
        return false;
      }
    }
    return true;
  }

  if (start.y === end.y) {
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    
    for (let x = minX + 1; x < maxX; x++) {
      if (tiles.some(t => !t.isMatched && t.x === x && t.y === start.y)) {
        return false;
      }
    }
    return true;
  }

  return false;
};

export const checkMatch = (tile1: Tile, tile2: Tile, tiles: Tile[]): boolean => {
  if (tile1.type !== tile2.type) return false;
  
  const start: Point = { x: tile1.x, y: tile1.y };
  const end: Point = { x: tile2.x, y: tile2.y };
  
  return isValidPath(start, end, tiles);
};