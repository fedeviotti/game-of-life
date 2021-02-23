import styled from 'styled-components';

export interface CellGridProps {
  alive: boolean;
  i: number;
  k: number;
}

const StyledCellGrid = styled.div<{ alive: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${props =>
    props.alive ? 'var(--color-primary)' : 'transparent'};
  border: 1px solid var(--color-grey);
`;

export default StyledCellGrid;
