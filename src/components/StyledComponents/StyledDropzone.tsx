import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const StyledDropzoneContainer = styled.div<{ isDragReject: any }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props =>
    props.isDragReject ? 'var(--color-error)' : 'var(--color-grey-ligth)'};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  grid-area: load;
`;

export interface StyledDropzoneProps {
  onInitGenLoaded: (
    generationCounter: number,
    rows: number,
    cols: number,
    grid: boolean[][]
  ) => void;
  onResetSimulation: () => void;
}

const StyledDropzone: React.FC<StyledDropzoneProps> = props => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        props.onResetSimulation();
        const binaryStr = String(reader.result);
        // Read the string and extract the values for initial state
        const [generation, rowsAndCols, ...grid] = binaryStr?.split(/\r?\n/);
        const generationCounter =
          Number(generation.slice(generation.indexOf(' ') + 1, -1)) | 1;
        const [rows, cols] = rowsAndCols.split(' ').map(el => Number(el) | 0);
        const initialGrid = grid
          .filter(row => row.length)
          .map<boolean[]>(row => row.split('').map(value => value === '*'));
        //console.log('generationCounter', generationCounter);
        //console.log('rows', rows);
        //console.log('cols', cols);
        //console.log('initialGrid', initialGrid);
        props.onInitGenLoaded(generationCounter, rows, cols, initialGrid);
      };
      reader.readAsText(file);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <StyledDropzoneContainer
      isDragReject={isDragReject}
      {...getRootProps({ isDragActive, isDragAccept })}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop a template here, or click to select a template</p>
    </StyledDropzoneContainer>
  );
};

export default StyledDropzone;
