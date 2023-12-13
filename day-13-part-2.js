const fs = require('fs');

const fileContents = fs.readFileSync('./day-13-input.txt', 'utf-8').split('\n');

let sum = 0;

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

const getReflectionRow = (grid, ignoreRow) => {
  for (let reflectionRowAfter = 0; reflectionRowAfter < grid.length - 1; reflectionRowAfter++) {
    if (reflectionRowAfter + 1 === ignoreRow) {
      continue;
    }
    let validReflection = true;
    let numAway = 0;
    while (validReflection) {
      const rowAbove = grid[reflectionRowAfter - numAway];
      const rowBelow = grid[reflectionRowAfter + numAway + 1];
      if (rowAbove == null || rowBelow == null) {
        break;
      } else if (rowAbove.join('') !== rowBelow.join('')) {
        validReflection = false;
      } else {
        numAway++;
      }
    }
    if (validReflection) {
      return reflectionRowAfter + 1;
    }
  }
  return null;
}

const grids = [[]];

for (const line of fileContents) {
  if (line.trim() === '') {
    grids.push([]);
    continue;
  }
  grids[grids.length - 1].push(line.split(''));
}

let gridNumber = 1;
for (const grid of grids) {
  let transposedGrid = transposeGrid(grid);
  const reflectionRow = getReflectionRow(grid);
  const reflectionColumn = getReflectionRow(transposedGrid);

  let found = false;
  for (let i = 0; i < grid.length && !found; i++) {
    for (let j = 0; j < grid[0].length && !found; j++) {
      grid[i][j] = grid[i][j] === '.' ? '#' : '.';

      transposedGrid = transposeGrid(grid);
      const newReflectionRow = getReflectionRow(grid, reflectionRow);
      const newReflectionColumn = getReflectionRow(transposedGrid, reflectionColumn);

      if ((newReflectionRow == null && newReflectionColumn == null)) {
        grid[i][j] = grid[i][j] === '.' ? '#' : '.';
        continue;
      }

      if (newReflectionRow !== reflectionRow || newReflectionColumn !== reflectionColumn) {
        if (newReflectionRow !== reflectionRow && newReflectionRow != null) {
          sum += 100 * newReflectionRow;
        } else {
          sum += newReflectionColumn;
        }
        found = true;
      }

      grid[i][j] = grid[i][j] === '.' ? '#' : '.';
    }
  }
  gridNumber++;
}

console.log(sum);