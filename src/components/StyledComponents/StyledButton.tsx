import styled from 'styled-components';

const StyledButtonLabel = styled.span`
  display: block;
  position: relative;
  z-index: 1;

  :after {
    content: '';
    position: absolute;
    z-index: -1;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    background: rgba(255, 255, 255, 0.7);
    width: 30px;
    height: 30px;
    border-radius: 100%;
    transform: scale(0);
  }
`;

const StyledButton = styled.button<{ running?: boolean }>`
  background-color: ${(props: any) =>
    props.running ? 'var(--color-secondary)' : 'var(--color-primary)'};
  text-transform: uppercase;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: 0;
  border-radius: 3px;
  width: 150px;
  padding: 10px 0;
  :focus {
    outline: none;
  }
  :hover:not([disabled]) {
    cursor: pointer;
    background-color: ${(props: any) =>
      props.running
        ? 'var(--color-secondary-dark)'
        : 'var(--color-primary-dark)'};
  }
  :disabled {
    opacity: 0.4;
  }
  :focus:not(:active) span::after {
    animation: circleGrow 0.3s linear;
  }
  @keyframes circleGrow {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: scale(5);
      opacity: 0;
    }
  }
`;

export { StyledButton, StyledButtonLabel };
