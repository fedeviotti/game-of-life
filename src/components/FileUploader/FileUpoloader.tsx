import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader: React.FC<{
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
