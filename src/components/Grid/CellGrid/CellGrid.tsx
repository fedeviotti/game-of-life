import React from 'react';
import StyledCellGrid, {
  CellGridProps,
} from '../../StyledComponents/StyledCellGrid';

const CellGrid: React.FC<CellGridProps> = props => {
  return (
    <StyledCellGrid alive={props.alive}>
      {/*{props.i}/{props.k}*/}
    </StyledCellGrid>
  );
};

export default CellGrid;
