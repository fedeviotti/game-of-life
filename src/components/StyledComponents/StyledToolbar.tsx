import styled from 'styled-components';

export interface ToolbarProps {
  running: boolean;
  isGridEmpty: boolean;
  simulationTimeout: number;
  toggleSimulation: () => void;
  changeSpeedSimulation: (delta: number) => void;
  resetSimulation: () => void;
}

const StyledToolbar = styled.div`
  height: 10vh;
  padding: 10px;
  grid-area: tool;
  align-items: center;
  justify-content: center;
  display: inline-grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(4, 200px);
`;

export default StyledToolbar;
