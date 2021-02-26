import React from 'react';
import CellGrid from './CellGrid/CellGrid';
import StyledGrid, { GridProps } from '../StyledComponents/StyledGrid';
import StyledCounter from '../StyledComponents/StyledCounter';

const Grid: React.FC<GridProps> = props => {
  return (
    <React.Fragment>
      <StyledGrid rows={props.rows} cols={props.cols}>
        {props.grid.length ? (
          props.grid.map((row: boolean[], i: number) =>
            row.map((value: boolean, k: number) => {
              return (
                <CellGrid
                  key={`${i}-${k}`}
                  alive={value}
                  i={i}
                  k={k}
                  running={props.running}
                  onToggleCell={props.onToggleCell}
                />
              );
            })
          )
        ) : (
          <div>Upload a template to start the game...</div>
        )}
      </StyledGrid>
      {props.grid.length > 0 && props.generationCounter > 0 && (
        <StyledCounter generationCounter={props.generationCounter}>
          Generation counter: {props.generationCounter}
        </StyledCounter>
      )}
    </React.Fragment>
  );
};

export default Grid;
