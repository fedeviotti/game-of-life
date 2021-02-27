import React, { useState, useRef, useCallback } from 'react';
import { produce } from 'immer';

import StyledDropzone from './components/StyledComponents/StyledDropzone';
import StyledHeader from './components/StyledComponents/StyledHeader';
import StyledFooter from './components/StyledComponents/StyledFooter';
import StyledApp from './components/StyledComponents/StyledApp';
import Grid from './components/Grid/Grid';
import Toolbar from './components/Toolbar/Toolbar';
import {
  neighboursCoords,
  fillGrid,
  defaultTotalRows,
  defaultTotalCols,
} from './utils/utils';

function App() {
  const initGrid = fillGrid(true);
  const [grid, setGrid] = useState<boolean[][]>(initGrid);
  const [generationCounter, setGenerationCounter] = useState<number>(0);
  const [generationCounterInit, setGenerationCounterInit] = useState<number>(0);
  const [lastGrid, setLastGrid] = useState<boolean[][]>(initGrid);
  const [totalRows, setTotalRows] = useState<number>(defaultTotalRows);
  const [totalCols, setTotalCols] = useState<number>(defaultTotalCols);
  const [running, setRunning] = useState<boolean>(false);
  const [simulationTimeout, setSimulationTimeout] = useState<number>(200);

  const initGridFromFile = (
    genCounter: number,
    rows: number,
    cols: number,
    gridFromFile: boolean[][]
  ) => {
    setGrid(gridFromFile);
    setLastGrid(gridFromFile);
    setTotalRows(rows);
    setTotalCols(cols);
    setGenerationCounter(genCounter);
    setGenerationCounterInit(genCounter);
  };

  // Reference to use inside useCallback
  const runningRef = useRef(running);
  runningRef.current = running;
  const gridRef = useRef(grid);
  gridRef.current = grid;
  const totalRowsRef = useRef(totalRows);
  totalRowsRef.current = totalRows;
  const totalColsRef = useRef(totalCols);
  totalColsRef.current = totalCols;
  const simulationTimeoutRef = useRef(simulationTimeout);
  simulationTimeoutRef.current = simulationTimeout;
  const generationCounterRef = useRef(generationCounter);
  generationCounterRef.current = generationCounter;

  const runSimulation = useCallback((runOnce: boolean = false) => {
    if (!runningRef.current) {
      return;
    }
    console.log('Simulation is running...');
    let again = false;
    const result = produce(gridRef.current, copyGrid => {
      gridRef.current.map((rows, i) => {
        rows.map((cell, k) => {
          let neighbours = 0;
          // calculating the neighbours numbers
          neighboursCoords.forEach(([x, y]) => {
            const ii = i + x;
            const kk = k + y;
            if (
              ii >= 0 &&
              ii < totalRowsRef.current &&
              kk >= 0 &&
              kk < totalColsRef.current
            ) {
              if (gridRef.current[ii][kk]) {
                neighbours++;
              }
            }
          });
          if (gridRef.current[i][k] && (neighbours < 2 || neighbours > 3)) {
            copyGrid[i][k] = false;
            again = true;
          } else if (!gridRef.current[i][k] && neighbours === 3) {
            copyGrid[i][k] = true;
            again = true;
          }
        });
      });
    });

    // if nothing changed I can stop the loop, not increment the counter and not update the grid
    if (!again) {
      setRunning(false);
    } else {
      // if runOnce is true I stop the loop
      if (runOnce) {
        setRunning(false);
      }
      setGrid(result);
      setGenerationCounter(generationCounterRef.current + 1);
    }

    setTimeout(() => runSimulation(), simulationTimeoutRef.current);
  }, []);

  const toggleSimulation = (runOnce: boolean = false) => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation(runOnce);
    }
  };

  const resetSimulation = (clear: boolean = false, random: boolean = false) => {
    setRunning(false);
    runningRef.current = false;
    if (clear || random) {
      const newGrid = fillGrid(random, totalRows, totalCols);
      setGrid(newGrid);
      if (random) {
        setLastGrid(newGrid);
      }
    } else {
      setGrid(lastGrid);
    }
    setGenerationCounter(generationCounterInit);
  };

  const changeSpeedSimulation = (delta: number) => {
    // increase/decrease timeout
    setSimulationTimeout(() => delta + simulationTimeout);
  };

  const toggleCell = (i: number, k: number) => {
    const updatedGrid = produce(grid, copyGrid => {
      copyGrid[i][k] = !grid[i][k];
    });
    setGrid(updatedGrid);
    setLastGrid(updatedGrid);
  };

  return (
    <StyledApp>
      <StyledHeader>Game of Life</StyledHeader>
      <StyledDropzone
        onInitGenLoaded={initGridFromFile}
        onResetSimulation={resetSimulation}
      />
      <Grid
        running={running}
        rows={totalRows}
        cols={totalCols}
        grid={grid}
        generationCounter={generationCounter}
        onToggleCell={toggleCell}
      />
      <Toolbar
        running={running}
        simulationTimeout={simulationTimeout}
        onToggleSimulation={toggleSimulation}
        onChangeSpeedSimulation={changeSpeedSimulation}
        onResetSimulation={resetSimulation}
      />
      <StyledFooter>Enjoy</StyledFooter>
    </StyledApp>
  );
}

export default App;
