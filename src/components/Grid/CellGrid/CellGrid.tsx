import React from 'react';

const CellGrid: React.FC<{
  alive: number;
}> = props => {
  return (
    <div
      style={{
        width: 25,
        height: 25,
        backgroundColor: props.alive ? '#1EE892' : 'transparent',
        border: '1px solid black',
      }}
    />
  );
};

export default CellGrid;
