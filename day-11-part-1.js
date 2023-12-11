const fs = require('fs');

const fileContents = fs.readFileSync('./day-11-input.txt', 'utf-8').split('\n');

const originalGrid = [];

for (const line of fileContents) {
  const splitLine = line.split('');
  originalGrid.push(splitLine);
  if (!splitLine.includes('#')) {
    originalGrid.push(splitLine);
  }
}

let colsWithoutGalaxies = [];

for (let col = 0; col < originalGrid[0].length; col++) {
  let colValues = [];
  for (let row = 0; row < originalGrid.length; row++) {
    colValues.push(originalGrid[row][col]);
  }
  if (!colValues.includes('#')) {
    colsWithoutGalaxies.push(col);
  }
}

const grid = [];

for (let row = 0; row < originalGrid.length; row++) {
  grid[row] = [];
  for (let col = 0; col < originalGrid[0].length; col++) {
    if (colsWithoutGalaxies.includes(col)) {
      grid[row].push('.');
    }
    grid[row].push(originalGrid[row][col]);
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

    const distance = Math.abs(row1 - row2) + Math.abs(col1 - col2);

    console.log(i, j, distance);

    sum += distance;
  }
}

console.log(sum);