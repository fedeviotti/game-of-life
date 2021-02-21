import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
const StyledDropzone: React.FC<{
  onInitGenLoaded: (
    startingGeneration: number,
    rows: number,
    cols: number,
    grid: Array<Array<number>>
  ) => void;
}> = props => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = String(reader.result);
        // Read the string and extract the values for initial state
        const [generation, rowsAndCols, ...grid] = binaryStr?.split(/\n/);
        const generationNumber =
          Number(generation.slice(generation.indexOf(' ') + 1, -1)) | 0;
        const [rows, cols] = rowsAndCols.split(' ').map(el => Number(el) | 0);
        const initialGrid = grid.map<Array<number>>(row =>
          row.split('').map(value => (value === '*' ? 1 : 0))
        );

        props.onInitGenLoaded(generationNumber, rows, cols, initialGrid);
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
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>
          Trascina il file qui dentro, oppure clicca per selezionare il file
        </p>
      </Container>
    </div>
  );
};

export default StyledDropzone;
