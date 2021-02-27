import styled from 'styled-components';

export interface ToolbarProps {
  running: boolean;
  simulationTimeout: number;
  onToggleSimulation: (runOnce?: boolean) => void;
  onChangeSpeedSimulation: (delta: number) => void;
  onResetSimulation: (clear?: boolean, random?: boolean) => void;
}

const StyledToolbar = styled.div`
  height: 10vh;
  margin: 15px;

  display: inline-grid;
  grid-area: tool;
  align-items: center;
  justify-content: center;
  grid-template-rows: 100%;
  grid-template-columns: repeat(7, 190px);
`;

export default StyledToolbar;
