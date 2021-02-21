import React from 'react';

const Toolbar: React.FC<{
  running: boolean;
  toggleSimulation: () => void;
}> = props => {
  const toggleSimulation = () => {
    props.toggleSimulation();
  };

  return (
    <div className="toolbar">
      <button onClick={toggleSimulation}>
        {props.running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Toolbar;
