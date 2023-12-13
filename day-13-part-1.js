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

const getReflectionRow = grid => {
  for (let reflectionRowAfter = 0; reflectionRowAfter < grid.length - 1; reflectionRowAfter++) {
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

for (const grid of grids) {
  const transposedGrid = transposeGrid(grid);
  const reflectionRow = getReflectionRow(grid);
  const reflectionColumn = getReflectionRow(transposedGrid);

  if (reflectionRow != null) {
    sum += 100 * reflectionRow;
  } else {
    sum += reflectionColumn;
  }
}

console.log(sum);