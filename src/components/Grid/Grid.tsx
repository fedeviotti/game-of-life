import React from 'react';
import CellGrid from './CellGrid/CellGrid';

const Grid: React.FC<{
  rows: number;
  cols: number;
  grid: any;
}> = props => {
  return (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${props.cols}, 25px)`,
      }}
    >
      {props.grid.map((row: any, i: number) =>
        row.map((value: any, k: number) => {
          return <CellGrid key={`${i}-${k}`} alive={value} />;
        })
      )}
    </div>
  );
};

export default Grid;
