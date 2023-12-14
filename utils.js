const transposeGrid = grid => {
  const result = [];
  for (let i = 0; i < grid[0].length; i++) {
    result.push([]);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      result[j][i] = grid[i][j];
    }
  }
  return result;
}

module.exports = {
  transposeGrid,
}