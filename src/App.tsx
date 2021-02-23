import React, { useState, useRef, useCallback } from 'react';
import { produce } from 'immer';

import StyledDropzone from './components/StyledComponents/StyledDropzone';
import StyledHeader from './components/StyledComponents/StyledHeader';
import StyledFooter from './components/StyledComponents/StyledFooter';
import StyledApp from './components/StyledComponents/StyledApp';
import Grid from './components/Grid/Grid';
import Toolbar from './components/Toolbar/Toolbar';

function App() {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalCols, setTotalCols] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [simulationTimeout, setSimulationTimeout] = useState<number>(500);
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
  let cellsToEvaluate: Set<string> = new Set<string>();
  let cellToEvaluateNextGen: Set<string> = new Set<string>();

  const initGridFromFile = (
    startingGeneration: number,
    rows: number,
    cols: number,
    grid: boolean[][]
  ) => {
    setGrid(() => [...grid]);
    setTotalRows(rows);
    setTotalCols(cols);
    // initialize cells to evaluate
    grid.forEach((row: boolean[], i: number) =>
      row.forEach((cell: boolean, k: number) => {
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
  const simulationTimeoutRef = useRef(simulationTimeout);
  simulationTimeoutRef.current = simulationTimeout;

  const addToCellsToEvaluate = (i: number, k: number, cellSet: Set<string>) => {
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
              //neighbours += currGrid[ii][kk] ? 1 : 0;
              if (currGrid[ii][kk]) {
                neighbours++;
              }
            }
          });

          if (neighbours < 2 || neighbours > 3) {
            copyGrid[i][k] = false;
          } else if (!currGrid[i][k] && neighbours === 3) {
            copyGrid[i][k] = true;
            addToCellsToEvaluate(i, k, cellToEvaluateNextGen);
          } else if (currGrid[i][k]) {
            addToCellsToEvaluate(i, k, cellToEvaluateNextGen);
          }
        });

        // clean the old array and copy the new one
        cellsToEvaluate = new Set(cellToEvaluateNextGen);

        // if no evaluation occurs we can stop the simulation
        if (!evalCount) {
          setRunning(false);
        }
      });
    });

    setTimeout(() => runSimulation(), simulationTimeoutRef.current);
  }, []);

  const toggleSimulation = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const changeSpeedSimulation = (delta: number) => {
    // increase/decrease timeout
    setSimulationTimeout(() => delta + simulationTimeout);
  };

  return (
    <StyledApp>
      <StyledHeader>Game of Life</StyledHeader>
      <StyledDropzone onInitGenLoaded={initGridFromFile} />
      <Grid rows={totalRows} cols={totalCols} grid={grid} />
      <Toolbar
        running={running}
        toggleSimulation={toggleSimulation}
        changeSpeedSimulation={changeSpeedSimulation}
      />
      <StyledFooter>Enjoy</StyledFooter>
    </StyledApp>
  );
}

export default App;
