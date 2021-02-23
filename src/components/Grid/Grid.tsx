import React from 'react';
import CellGrid from './CellGrid/CellGrid';
import StyledGrid, { GridProps } from '../StyledComponents/StyledGrid';

const Grid: React.FC<GridProps> = props => {
  return (
    <StyledGrid rows={props.rows} cols={props.cols}>
      {props.grid.length ? (
        props.grid.map((row: boolean[], i: number) =>
          row.map((value: boolean, k: number) => {
            return <CellGrid key={`${i}-${k}`} alive={value} i={i} k={k} />;
          })
        )
      ) : (
        <div>Upload a template to start the game...</div>
      )}
    </StyledGrid>
  );
};

export default Grid;
