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
  const [gridOptimized, setGridOptimized] = useState<Array<Array<number>>>([]);
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
    setGridOptimized(() => grid.map((rows: any) => rows.map((cell: any) => 2)));
    setRows(rows);
    setCols(cols);
  };

  const runningRef = useRef(running);
  runningRef.current = running;
  const gridRef = useRef(grid);
  gridRef.current = grid;
  const gridOptimizedRef = useRef(gridOptimized);
  gridOptimizedRef.current = gridOptimized;

  const runSimulation = useCallback(async () => {
    if (!runningRef.current) {
      return;
    }
    console.log('Simulation is running...');

    await setGrid(currGrid => {
      let evalCount = 0;
      let bypassCount = 0;
      return produce(currGrid, copyGrid => {
        currGrid.map((row, i, rows) => {
          row.map((cell, k, cols) => {
            if (
              gridOptimizedRef.current.length > 0 &&
              gridOptimizedRef.current[i][k] === 2
            ) {
              evalCount++;
              let neighbours = 0;
              neighboursCoords.forEach(([x, y]) => {
                const ii = i + x;
                const kk = k + y;
                if (
                  ii >= 0 &&
                  ii < rows.length &&
                  kk >= 0 &&
                  kk < cols.length
                ) {
                  neighbours += currGrid[ii][kk];
                }
              });
              if (neighbours < 2 || neighbours > 3) {
                copyGrid[i][k] = 0;
              } else if (!currGrid[i][k] && neighbours === 3) {
                copyGrid[i][k] = 1;
              }
            } else {
              bypassCount++;
            }
          });
        });
        console.log(`evaluation ${evalCount}`, `bybass ${bypassCount}`);
        if (!evalCount) {
          // if no evaluation occurs we can stop the simulation
          setRunning(false);
        }
      });
    });

    await setGridOptimized(currGridOpt => {
      return produce(currGridOpt, copyGridOpt => {
        gridRef.current.map((row, i, rows) => {
          row.map((cell, k, cols) => {
            if (cell) {
              copyGridOpt[i][k] = 2;
              neighboursCoords.forEach(([x, y]) => {
                const ii = i + x;
                const kk = k + y;
                if (
                  ii >= 0 &&
                  ii < rows.length &&
                  kk >= 0 &&
                  kk < cols.length
                ) {
                  copyGridOpt[ii][kk] = 2;
                }
              });
            } else {
              copyGridOpt[i][k] = 0;
            }
          });
        });
      });
    });

    setTimeout(() => runSimulation(), 300);
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
