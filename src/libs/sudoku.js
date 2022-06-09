import generator from 'sudoku';

window.generator = generator;

export default () => {
  const raw = generator.makepuzzle();

  console.log(raw);

  const result = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = Number.isInteger(raw[i * 9 + j]) ? raw[i * 9 + j] + 1 : null;
      const col = {
        row: i,
        col: j,
        value,
        readOnly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  console.log(result)
  return result;
  
};
