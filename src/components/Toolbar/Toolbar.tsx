import React from 'react';
import StyledButton from '../StyledComponents/StyledButton';
import StyledToolbar, { ToolbarProps } from '../StyledComponents/StyledToolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  const speedUpSimulation = () => {
    props.changeSpeedSimulation(-100);
  };
  const slowDownSimulation = () => {
    props.changeSpeedSimulation(100);
  };

  return (
    <StyledToolbar>
      <StyledButton
        onClick={props.toggleSimulation}
        running={props.running}
        disabled={props.isGridEmpty}
      >
        {props.running ? 'Stop' : 'Start'}
      </StyledButton>
      <StyledButton
        onClick={speedUpSimulation}
        disabled={props.isGridEmpty || props.simulationTimeout <= 0}
      >
        Speed Up
      </StyledButton>
      <StyledButton onClick={slowDownSimulation} disabled={props.isGridEmpty}>
        Slow Down
      </StyledButton>
      <StyledButton
        onClick={props.resetSimulation}
        disabled={props.isGridEmpty}
      >
        Reset
      </StyledButton>
    </StyledToolbar>
  );
};

export default Toolbar;
