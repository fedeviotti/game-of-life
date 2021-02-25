import React, { useState, useRef, useCallback, useEffect } from 'react';
import { produce } from 'immer';

import StyledDropzone from './components/StyledComponents/StyledDropzone';
import StyledHeader from './components/StyledComponents/StyledHeader';
import StyledFooter from './components/StyledComponents/StyledFooter';
import StyledApp from './components/StyledComponents/StyledApp';
import Grid from './components/Grid/Grid';
import Toolbar from './components/Toolbar/Toolbar';

function App() {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [generationCounter, setGenerationCounter] = useState<number>(0);
  const [generationCounterInit, setGenerationCounterInit] = useState<number>(0);
  const [lastGrid, setLastGrid] = useState<boolean[][]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalCols, setTotalCols] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [simulationTimeout, setSimulationTimeout] = useState<number>(200);
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

  useEffect(() => {
    setDefaultGrid();
  }, []);

  const setDefaultGrid = () => {
    console.log('default grid');
  }

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
    // initialize cells to evaluate
    gridFromFile.forEach((row: boolean[], i: number) =>
      row.forEach((cell: boolean, k: number) => {
        if (cell) {
          addToCellsToEvaluate(i, k, cellsToEvaluate);
        }
      })
    );
  };

  const runningRef = useRef(running);
  runningRef.current = running;
  const gridRef = useRef(grid);
  gridRef.current = grid;
  //const cellToEvaluateNextGenRef = useRef(cellToEvaluateNextGen);
  //cellToEvaluateNextGenRef.current = cellToEvaluateNextGen;
  const totalRowsRef = useRef(totalRows);
  totalRowsRef.current = totalRows;
  const totalColsRef = useRef(totalCols);
  totalColsRef.current = totalCols;
  const simulationTimeoutRef = useRef(simulationTimeout);
  simulationTimeoutRef.current = simulationTimeout;
  const generationCounterRef = useRef(generationCounter);
  generationCounterRef.current = generationCounter;

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

    //cellToEvaluateNextGenRef.current = new Set<string>();
    const result = produce(gridRef.current, copyGrid => {
      let evalCount = 0;
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
            if (gridRef.current[ii][kk]) {
              neighbours++;
            }
          }
        });
        if (neighbours < 2 || neighbours > 3) {
          copyGrid[i][k] = false;
        } else if (!gridRef.current[i][k] && neighbours === 3) {
          copyGrid[i][k] = true;
          addToCellsToEvaluate(i, k, cellToEvaluateNextGen);
        } else if (gridRef.current[i][k]) {
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

  const clearSimulation = (reloadLast: boolean) => {
    setRunning(false);
    runningRef.current = false;
    setGrid(reloadLast ? lastGrid : []);
    setGenerationCounter(reloadLast ? generationCounterInit : 0);
    cellsToEvaluate.clear();
    cellToEvaluateNextGen.clear();
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
        clearSimulation={clearSimulation}
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
        clearSimulation={clearSimulation}
      />
      <StyledFooter>Enjoy</StyledFooter>
    </StyledApp>
  );
}

export default App;
