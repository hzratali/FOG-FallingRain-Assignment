// WaveGrid.tsx
import React, { useState, useEffect } from 'react';

type Cell = {
  x: number;
  y: number;
};

const WaveGrid: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>(Array(20).fill(Array(20).fill('bg-black')));
  const [waveCenter, setWaveCenter] = useState<Cell | null>(null);
  const [waveStep, setWaveStep] = useState(0);

  // Initialize a looping wave effect when a cell is clicked
  useEffect(() => {
    if (waveCenter) {
      const interval = setInterval(() => {
        setWaveStep((prevStep) => prevStep + 1);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [waveCenter]);

  // Update the grid based on the wave step and reset previous layers to black
  useEffect(() => {
    if (waveCenter) {
      const newGrid = Array(20).fill(null).map(() => Array(20).fill('bg-black'));

      // Create the wave layer by layer
      for (let dx = -waveStep; dx <= waveStep; dx++) {
        for (let dy = -waveStep; dy <= waveStep; dy++) {
          const x = waveCenter.x + dx;
          const y = waveCenter.y + dy;

          // Ensure cells are within bounds and form a square wave layer
          if (
            x >= 0 && x < 20 && y >= 0 && y < 20 &&
            (Math.abs(dx) === waveStep || Math.abs(dy) === waveStep)
          ) {
            newGrid[x][y] = 'bg-green-500';
          }
        }
      }

      setGrid(newGrid);
    }
  }, [waveStep, waveCenter]);

  // Handle cell click to start the wave effect
  const handleCellClick = (x: number, y: number) => {
    setWaveCenter({ x, y });
    setWaveStep(0);
  };

  return (
    <div 
      className="grid gap-0" 
      style={{
        gridTemplateColumns: 'repeat(20, 1fr)',
        width: '400px',
        height: '400px'
      }}
    >
      {grid.map((row, x) =>
        row.map((cellClass: string, y: number) => (
          <div
            key={`${x}-${y}`}
            className={`w-full h-full ${cellClass}`}
            style={{ width: '20px', height: '20px' }}
            onClick={() => handleCellClick(x, y)}
          ></div>
        ))
      )}
    </div>
  );
};

export default WaveGrid;
