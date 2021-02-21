import styled from 'styled-components';

const StyledButton = styled.button<{ running: boolean }>`
  background-color: ${(props: any) => (props.running ? '#00C5FF' : '#1EE892')};
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: 0;
  border-radius: 3px;
  width: 80px;
  padding: 5px 12px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${(props: any) =>
      props.running ? '#008FEB' : '#00BAA3'};
  }
`;

export default StyledButton;
