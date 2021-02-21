import React from 'react';
import StyledButton from '../Styled/StyledButton';

const Toolbar: React.FC<{
  running: boolean;
  toggleSimulation: () => void;
}> = props => {
  const toggleSimulation = () => {
    props.toggleSimulation();
  };

  return (
    <div className="toolbar">
      <StyledButton onClick={toggleSimulation} running={props.running}>
        {props.running ? 'Stop' : 'Start'}
      </StyledButton>
    </div>
  );
};

export default Toolbar;
