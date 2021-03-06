import styled from 'styled-components';

export interface GridProps {
  running: boolean;
  rows: number;
  cols: number;
  grid: boolean[][];
  generationCounter: number;
  onToggleCell: (i: number, k: number) => void;
}

const StyledGrid = styled.div<{ cols: number; rows: number }>`
  margin: 25px;

  display: inline-grid;
  grid-area: main;
  justify-content: center;
  align-content: center;
  grid-template-rows: ${props => `repeat(${props.rows}, 30px)`};
  grid-template-columns: ${props => `repeat(${props.cols}, 30px)`};
`;

export default StyledGrid;
