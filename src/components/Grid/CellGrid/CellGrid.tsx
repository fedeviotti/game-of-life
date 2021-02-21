import React from 'react';

const CellGrid: React.FC<{
  alive: number;
  i: number;
  k: number;
}> = props => {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        backgroundColor: props.alive ? '#1EE892' : 'transparent',
        border: '1px solid #696969',
      }}
    >
      {/*{props.i}/{props.k}*/}
    </div>
  );
};

export default CellGrid;
