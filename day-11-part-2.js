const fs = require('fs');

const fileContents = fs.readFileSync('./day-11-input.txt', 'utf-8').split('\n');

const grid = [];

const largeRows = [];

let rowNum = 0;
for (const line of fileContents) {
  const splitLine = line.split('');
  grid.push(splitLine);
  if (!splitLine.includes('#')) {
    largeRows.push(rowNum);
  }
  rowNum++;
}

let largeCols = [];

for (let col = 0; col < grid[0].length; col++) {
  let colValues = [];
  for (let row = 0; row < grid.length; row++) {
    colValues.push(grid[row][col]);
  }
  if (!colValues.includes('#')) {
    largeCols.push(col);
  }
}

const galaxyLocations = [];

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === '#') {
      galaxyLocations.push([row, col]);
    }
  }
}

let sum = 0;

for (let i = 0; i < galaxyLocations.length; i++) {
  for (let j = i + 1; j < galaxyLocations.length; j++) {
    const [row1, col1] = galaxyLocations[i];
    const [row2, col2] = galaxyLocations[j];

    const largerRow = row1 > row2 ? row1 : row2;
    const smallerRow = row1 > row2 ? row2 : row1;
    const largerCol = col1 > col2 ? col1 : col2;
    const smallerCol = col1 > col2 ? col2 : col1;

    const numLargeColumnsBetween = largeCols.filter(col => smallerCol < col && col < largerCol).length;
    const numLargeRowsBetween = largeRows.filter(row => smallerRow < row && row < largerRow).length;

    const distance = Math.abs(row1 - row2) + 999999 * numLargeColumnsBetween + Math.abs(col1 - col2) + 999999 * numLargeRowsBetween;

    sum += distance;
  }
}

console.log(sum);