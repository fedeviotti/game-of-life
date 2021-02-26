import styled from 'styled-components';

export interface CellGridProps {
  running: boolean;
  alive: boolean;
  i: number;
  k: number;
  onToggleCell: (i: number, k: number) => void;
}

const StyledCellGrid = styled.div<{ alive: boolean; running?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${props =>
    props.alive ? 'var(--color-primary)' : 'var(--color-white)'};
  border: 1px solid var(--color-grey);
  transition: all 0.2s;
  cursor: ${props => (props.running ? 'not-allowed' : 'pointer')};
  :hover {
    transform: translateY(-3px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default StyledCellGrid;
