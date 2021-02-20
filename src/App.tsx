import React, { useState, useRef, useCallback } from 'react';
import { produce } from 'immer';

import Header from '../src/components/Header/Header';
import Grid from './components/Grid/Grid';
import Footer from './components/Footer/Footer';
import FileUploader from './components/FileUploader/FileUpoloader';
import Toolbar from './components/Toolbar/Toolbar';

import './App.css';

function App() {
  const [grid, setGrid] = useState<Array<Array<number>>>([]);
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const neighboursCoords = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const initGridFromFile = (
    startingGeneration: number,
    rows: number,
    cols: number,
    grid: any
  ) => {
    setGrid(() => [...grid]);
    setRows(rows);
    setCols(cols);
  };

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    console.log('Simulation is running...');

    setGrid(currentGrid => {
      return produce(currentGrid, copyGrid => {
        currentGrid.map((row, i, rows) => {
          return row.map((cell, k, cols) => {
            let neighbours = 0;
            neighboursCoords.forEach(([x, y]) => {
              const ii = i + x;
              const kk = k + y;
              if (ii >= 0 && ii < rows.length && kk >= 0 && kk < cols.length) {
                neighbours += currentGrid[ii][kk];
              }
            });
            if (neighbours < 2 || neighbours > 3) {
              copyGrid[i][k] = 0;
            } else if (!currentGrid[i][k] && neighbours === 3) {
              copyGrid[i][k] = 1;
            }
            return null;
          });
        });
      });
    });

    setTimeout(() => runSimulation(), 2000);
  }, []);

  const toggleSimulation = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  return (
    <div className="App">
      <Header />
      <FileUploader onInitGenLoaded={initGridFromFile} />
      <Grid rows={rows} cols={cols} grid={grid} />
      <Toolbar running={running} toggleSimulation={toggleSimulation} />
      <Footer />
    </div>
  );
}

export default App;
