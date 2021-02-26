import React from 'react';
import StyledCellGrid, {
  CellGridProps,
} from '../../StyledComponents/StyledCellGrid';

const CellGrid: React.FC<CellGridProps> = props => {
  const toggleCell = () => {
    if (!props.running) {
      props.onToggleCell(props.i, props.k);
    }
  };
  return (
    <StyledCellGrid
      onClick={toggleCell}
      alive={props.alive}
      running={props.running}
    >
      {/*{props.i}/{props.k}*/}
    </StyledCellGrid>
  );
};

export default CellGrid;
