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
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalCols, setTotalCols] = useState<number>(0);
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
  let cellsToEvaluate = new Set<string>();
  let cellToEvaluateNextGen = new Set<string>();

  const initGridFromFile = (
    startingGeneration: number,
    rows: number,
    cols: number,
    grid: any
  ) => {
    setGrid(() => [...grid]);
    setTotalRows(rows);
    setTotalCols(cols);
    // initialize cells to evaluate
    grid.forEach((row: any, i: number) =>
      row.forEach((cell: any, k: number) => {
        if (cell) {
          addToCellsToEvaluate(i, k, cellsToEvaluate);
        }
      })
    );
  };

  const runningRef = useRef(running);
  runningRef.current = running;
  const cellToEvaluateNextGenRef = useRef(cellToEvaluateNextGen);
  cellToEvaluateNextGenRef.current = cellToEvaluateNextGen;
  const totalRowsRef = useRef(totalRows);
  totalRowsRef.current = totalRows;
  const totalColsRef = useRef(totalCols);
  totalColsRef.current = totalCols;

  const addToCellsToEvaluate = (i: number, k: number, cellSet: Set<string>) => {
    console.log('cellSet', cellSet);
    cellSet.add(`${i}/${k}`);
    neighboursCoords.forEach(([x, y]) => {
      const ii = i + x;
      const kk = k + y;
      if (
        ii >= 0 &&
        ii < totalRowsRef.current &&
        kk >= 0 &&
        kk < totalColsRef.current
      ) {
        cellSet.add(`${ii}/${kk}`);
      }
    });
    //console.log('cellToEvaluateNextGen', cellToEvaluateNextGen);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    console.log('Simulation is running...');

    setGrid(currGrid => {
      let evalCount = 0;
      cellToEvaluateNextGenRef.current = new Set<string>();
      return produce(currGrid, copyGrid => {
        cellsToEvaluate.forEach((cellToEval: string) => {
          const [i, k] = cellToEval.split('/').map(el => +el);
          //console.log('i - k', `${i} - ${k}`);
          evalCount++;
          let neighbours = 0;
          neighboursCoords.forEach(([x, y]) => {
            const ii = i + x;
            const kk = k + y;
            if (
              ii >= 0 &&
              ii < totalRowsRef.current &&
              kk >= 0 &&
              kk < totalColsRef.current
            ) {
              neighbours += currGrid[ii][kk];
            }
          });
          //console.log('neighbours', neighbours);
          if (neighbours < 2 || neighbours > 3) {
            copyGrid[i][k] = 0;
          } else if (!currGrid[i][k] && neighbours === 3) {
            copyGrid[i][k] = 1;
            addToCellsToEvaluate(i, k, cellToEvaluateNextGen);
          } else if (currGrid[i][k]) {
            addToCellsToEvaluate(i, k, cellToEvaluateNextGen);
          }
        });

        // clean the old array and copy the new one
        cellsToEvaluate = new Set(cellToEvaluateNextGen);

        console.log(`evaluation ${evalCount}`);
        // if no evaluation occurs we can stop the simulation
        if (!evalCount) {
          setRunning(false);
        }
      });
    });

    setTimeout(() => runSimulation(), 1000);
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
      <Grid rows={totalRows} cols={totalCols} grid={grid} />
      <Toolbar running={running} toggleSimulation={toggleSimulation} />
      <Footer />
    </div>
  );
}

export default App;
