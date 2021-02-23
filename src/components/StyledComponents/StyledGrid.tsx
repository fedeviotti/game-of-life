import styled from 'styled-components';

export interface GridProps {
  rows: number;
  cols: number;
  grid: boolean[][];
}

const StyledGrid = styled.div<{ cols: number; rows: number }>`
  padding: 30px;
  grid-area: main;
  background-color: transparent;
  justify-content: center;
  display: inline-grid;
  grid-template-rows: ${props => `repeat(${props.rows}, 30px)`};
  grid-template-columns: ${props => `repeat(${props.cols}, 30px)`};
`;

export default StyledGrid;
