import React from 'react';
import StyledButton from '../StyledComponents/StyledButton';
import StyledToolbar, { ToolbarProps } from '../StyledComponents/StyledToolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  const toggleSimulation = () => {
    props.toggleSimulation();
  };
  const speedUpSimulation = () => {
    props.changeSpeedSimulation(-100);
  };
  const slowDownSimulation = () => {
    props.changeSpeedSimulation(100);
  };
  const clearSimulation = () => {
    props.clearSimulation(true);
  };

  return (
    <StyledToolbar>
      <StyledButton onClick={toggleSimulation} running={props.running}>
        {props.running ? 'Stop' : 'Start'}
      </StyledButton>
      <StyledButton onClick={speedUpSimulation}>Speed Up</StyledButton>
      <StyledButton onClick={slowDownSimulation}>Slow Down</StyledButton>
      <StyledButton onClick={clearSimulation}>Reset</StyledButton>
    </StyledToolbar>
  );
};

export default Toolbar;
