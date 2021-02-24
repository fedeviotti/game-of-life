import styled from 'styled-components';

export interface CounterProps {
  generationCounter: number;
}

const StyledCounter = styled.div<{ generationCounter: number }>`
  padding: 30px;
  grid-area: cnt;
  display: ${props => (props.generationCounter ? 'inline-grid' : 'none')};
  justify-content: center;
`;

export default StyledCounter;
