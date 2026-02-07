'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Tile {
  id: number;
  position: number;
}

export default function Level1({ onComplete }: { onComplete: () => void }) {
  const gridSize = 3;
  const totalTiles = gridSize * gridSize - 1;
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, []);

  // Check if puzzle is solved
  useEffect(() => {
    if (tiles.length === 0) return;
    const solved = tiles.every((tile) => tile.position === tile.id);
    if (solved && moves > 0) {
      setIsComplete(true);
    }
  }, [tiles, moves]);

  const initializePuzzle = () => {
    const initialTiles: Tile[] = Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      position: i,
    }));

    // Shuffle tiles
    for (let i = 0; i < 100; i++) {
      const emptyPos = initialTiles.findIndex((t) => t.position === totalTiles);
      const neighbors = getNeighbors(emptyPos);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      const neighbor = initialTiles.find((t) => t.position === randomNeighbor);
      if (neighbor) {
        [initialTiles[emptyPos].position, neighbor.position] = [
          neighbor.position,
          initialTiles[emptyPos].position,
        ];
      }
    }

    setTiles(initialTiles);
    setMoves(0);
    setIsComplete(false);
  };

  const getNeighbors = (position: number): number[] => {
    const neighbors: number[] = [];
    const row = Math.floor(position / gridSize);
    const col = position % gridSize;

    if (row > 0) neighbors.push(position - gridSize); // Up
    if (row < gridSize - 1) neighbors.push(position + gridSize); // Down
    if (col > 0) neighbors.push(position - 1); // Left
    if (col < gridSize - 1) neighbors.push(position + 1); // Right

    return neighbors;
  };

  const handleTileClick = (tileId: number) => {
    if (isComplete) return;

    const emptyPos = tiles.findIndex((t) => t.position === totalTiles);
    const tileIndex = tiles.findIndex((t) => t.id === tileId);
    const tilePos = tiles[tileIndex].position;

    if (getNeighbors(emptyPos).includes(tilePos)) {
      const newTiles = [...tiles];
      [newTiles[emptyPos].position, newTiles[tileIndex].position] = [
        tilePos,
        emptyPos,
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Level 1: Photo Puzzle</h1>
        <p className="text-lg opacity-80">Solve the sliding puzzle to continue</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-1 bg-[#00ff41] rounded-lg"
      >
        <div className="grid gap-0.5 bg-black p-2 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: '300px',
            height: '300px',
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, position) => {
            const tile = tiles.find((t) => t.position === position);

            if (!tile) {
              // Empty space
              return (
                <div
                  key={`empty-${position}`}
                  className="bg-black"
                />
              );
            }

            const tileRow = Math.floor(tile.id / gridSize);
            const tileCol = tile.id % gridSize;
            const backgroundPositionX = (tileCol / (gridSize - 1)) * 100;
            const backgroundPositionY = (tileRow / (gridSize - 1)) * 100;

            return (
              <motion.button
                key={tile.id}
                onClick={() => handleTileClick(tile.id)}
                className="bg-cover bg-no-repeat cursor-pointer hover:opacity-90 transition-opacity border border-[#00ff41]"
                style={{
                  backgroundImage: 'url(/valentinescats.jpg)',
                  backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            );
          })}
        </div>
      </motion.div>

      <div className="text-center">
        <p className="text-xl opacity-70 mb-4">Moves: {moves}</p>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-3"
          >
            <p className="text-2xl font-bold text-[#00ff41]">🎉 Puzzle Complete!</p>
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#00ff41] text-black font-bold rounded-lg hover:opacity-90"
            >
              Next Level →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
