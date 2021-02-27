import React from 'react';
import StyledButton from '../StyledComponents/StyledButton';
import StyledToolbar, { ToolbarProps } from '../StyledComponents/StyledToolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  return (
    <StyledToolbar>
      <StyledButton
        onClick={() => props.onToggleSimulation()}
        running={props.running}
      >
        {props.running ? 'Stop' : 'Start'}
      </StyledButton>
      <StyledButton
        onClick={() => props.onToggleSimulation(true)}
        disabled={props.running}
      >
        Next
      </StyledButton>
      <StyledButton
        onClick={() => props.onChangeSpeedSimulation(-100)}
        disabled={props.simulationTimeout <= 0}
      >
        Speed Up
      </StyledButton>
      <StyledButton
        onClick={() => props.onChangeSpeedSimulation(100)}
        disabled={props.simulationTimeout > 1000}
      >
        Slow Down
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation(false, true)}
        disabled={props.running}
      >
        Randomize
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation()}
        disabled={props.running}
      >
        Reset
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation(true)}
        disabled={props.running}
      >
        Clear
      </StyledButton>
    </StyledToolbar>
  );
};

export default Toolbar;
