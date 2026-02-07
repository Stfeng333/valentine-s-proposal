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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Shuffle tiles by making random valid moves
    let emptyPos = totalTiles; // Start with empty position at the end
    
    for (let i = 0; i < 100; i++) {
      const neighbors = getNeighbors(emptyPos);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Find the tile at the random neighbor position and swap with empty
      const tileIndex = initialTiles.findIndex((t) => t.position === randomNeighbor);
      if (tileIndex !== -1) {
        initialTiles[tileIndex].position = emptyPos;
        emptyPos = randomNeighbor;
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

    // Find which position is empty (not occupied by any tile)
    const occupiedPositions = tiles.map(t => t.position);
    const emptyPos = Array.from({ length: gridSize * gridSize }, (_, i) => i)
      .find(pos => !occupiedPositions.includes(pos)) ?? totalTiles;
    
    const tileIndex = tiles.findIndex((t) => t.id === tileId);
    if (tileIndex === -1) return;
    
    const tilePos = tiles[tileIndex].position;

    // Check if the tile is adjacent to the empty position
    if (getNeighbors(emptyPos).includes(tilePos)) {
      const newTiles = [...tiles];
      newTiles[tileIndex].position = emptyPos;
      setTiles(newTiles);
      setMoves((m) => m + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
            animate={{
              y: '-10vh',
              x: `${Math.random() * 100}vw`,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-6xl font-bold mb-4">Level 1: Photo Puzzle</h1>
        <p className="text-2xl opacity-90">Solve the sliding puzzle to continue</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-2 bg-[#00ff41] rounded-2xl shadow-2xl relative z-10"
        style={{
          boxShadow: '0 0 40px rgba(0, 255, 65, 0.4)',
        }}
      >
        <div className="grid gap-1 bg-black p-3 rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: '450px',
            height: '450px',
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

      <div className="text-center relative z-10">
        <p className="text-3xl opacity-80 mb-6 font-bold">Moves: {moves}</p>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4"
          >
            <p className="text-4xl font-bold text-[#00ff41]">🎉 Puzzle Complete!</p>
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(0, 255, 65, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#00ff41] text-black text-xl font-bold rounded-xl hover:opacity-90 shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
              }}
            >
              Next Level →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
