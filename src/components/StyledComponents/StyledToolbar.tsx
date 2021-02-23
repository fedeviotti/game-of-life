import styled from 'styled-components';

export interface ToolbarProps {
  running: boolean;
  toggleSimulation: () => void;
  changeSpeedSimulation: (delta: number) => void;
}

const StyledToolbar = styled.div`
  padding: 20px;
  grid-area: tool;
  align-items: center;
`;

export default StyledToolbar;
