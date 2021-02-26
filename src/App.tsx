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
  const [generationCounter, setGenerationCounter] = useState<number>(1);
  const [generationCounterInit, setGenerationCounterInit] = useState<number>(1);
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

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    console.log('Simulation is running...');

    const result = produce(gridRef.current, copyGrid => {
      gridRef.current.map((rows, i) => {
        rows.map((cell, k) => {
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
              if (gridRef.current[ii][kk]) {
                neighbours++;
              }
            }
          });
          if (neighbours < 2 || neighbours > 3) {
            copyGrid[i][k] = false;
          } else if (!gridRef.current[i][k] && neighbours === 3) {
            copyGrid[i][k] = true;
          }
        });
      });
    });
    setGenerationCounter(generationCounterRef.current + 1);
    setGrid(result);

    setTimeout(() => runSimulation(), simulationTimeoutRef.current);
  }, []);

  const toggleSimulation = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const resetSimulation = () => {
    setRunning(false);
    runningRef.current = false;
    setGrid(lastGrid);
    setGenerationCounter(generationCounterInit);
  };

  const changeSpeedSimulation = (delta: number) => {
    // increase/decrease timeout
    setSimulationTimeout(() => delta + simulationTimeout);
  };

  return (
    <StyledApp>
      <StyledHeader>Game of Life</StyledHeader>
      <StyledDropzone
        onInitGenLoaded={initGridFromFile}
        resetSimulation={resetSimulation}
      />
      <Grid
        rows={totalRows}
        cols={totalCols}
        grid={grid}
        generationCounter={generationCounter}
      />
      <Toolbar
        isGridEmpty={grid.length === 0}
        running={running}
        simulationTimeout={simulationTimeout}
        toggleSimulation={toggleSimulation}
        changeSpeedSimulation={changeSpeedSimulation}
        resetSimulation={resetSimulation}
      />
      <StyledFooter>Enjoy</StyledFooter>
    </StyledApp>
  );
}

export default App;
