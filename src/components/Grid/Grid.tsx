import React from 'react';
import CellGrid from './CellGrid/CellGrid';

const Grid: React.FC<{
  rows: number;
  cols: number;
  grid: any;
}> = props => {
  return (
    <div
      className="main-grid"
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${props.cols}, 30px)`,
        gridTemplateRows: `repeat(${props.rows}, 30px)`,
      }}
    >
      {props.grid.length ? (
        props.grid.map((row: any, i: number) =>
          row.map((value: any, k: number) => {
            return <CellGrid key={`${i}-${k}`} alive={value} i={i} k={k} />;
          })
        )
      ) : (
        <div>Carica il file per visualizzare la griglia...</div>
      )}
    </div>
  );
};

export default Grid;
