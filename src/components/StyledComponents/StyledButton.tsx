import styled from 'styled-components';

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
`;

export default StyledButton;
