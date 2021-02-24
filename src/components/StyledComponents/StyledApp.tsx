import styled from 'styled-components';

const StyledApp = styled.div`
  font-family: Roboto, sans-serif;
  display: grid;
  min-height: 100vh;
  grid-template-columns: 50px 1fr 1fr 50px;
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas:
    'head head head head'
    'load load load load'
    '.    main main .   '
    '.    cnt  cnt  .   '
    '.    tool tool .   '
    'foot foot foot foot';
`;

export default StyledApp;
