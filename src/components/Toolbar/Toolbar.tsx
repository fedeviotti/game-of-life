import React from 'react';
import {
  StyledButton,
  StyledButtonLabel,
} from '../StyledComponents/StyledButton';
import StyledToolbar, { ToolbarProps } from '../StyledComponents/StyledToolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  return (
    <StyledToolbar>
      <StyledButton
        onClick={() => props.onToggleSimulation()}
        running={props.running}
      >
        <StyledButtonLabel>
          {props.running ? 'Stop' : 'Start'}
        </StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onToggleSimulation(true)}
        disabled={props.running}
      >
        <StyledButtonLabel>Next</StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onChangeSpeedSimulation(-100)}
        disabled={props.simulationTimeout <= 0}
      >
        <StyledButtonLabel>Speed Up</StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onChangeSpeedSimulation(100)}
        disabled={props.simulationTimeout > 1000}
      >
        <StyledButtonLabel>Slow Down</StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation(false, true)}
        disabled={props.running}
      >
        <StyledButtonLabel>Randomize</StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation()}
        disabled={props.running}
      >
        <StyledButtonLabel>Reset</StyledButtonLabel>
      </StyledButton>
      <StyledButton
        onClick={() => props.onResetSimulation(true)}
        disabled={props.running}
      >
        <StyledButtonLabel>Clear</StyledButtonLabel>
      </StyledButton>
    </StyledToolbar>
  );
};

export default Toolbar;
