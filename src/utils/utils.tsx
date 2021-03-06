export const defaultTotalRows = 12;
export const defaultTotalCols = 28;

export const neighboursCoords = [
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

export const fillGrid = (
  random: boolean = false,
  rows: number = defaultTotalRows,
  cols: number = defaultTotalCols
) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(
      Array.from(Array(cols), () => (random ? Math.random() > 0.8 : false))
    );
  }
  return grid;
};
