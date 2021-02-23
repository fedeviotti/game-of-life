import styled from 'styled-components';

export interface ToolbarProps {
  running: boolean;
  toggleSimulation: () => void;
  changeSpeedSimulation: (delta: number) => void;
  clearSimulation: (reloadLast: boolean) => void;
}

const StyledToolbar = styled.div`
  padding: 20px;
  grid-area: tool;
  align-items: center;
`;

export default StyledToolbar;
