const fs = require('fs');

const fileContents = fs.readFileSync('./day-14-input.txt', 'utf-8').split('\n');

let sum = 0;

const grid = [];

const getGridAsString = () => {
  let result = '';
  for (const row of grid) {
    result += row.join('');
  }
  return result;
}

const tiltNorth = () => {
  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row - 1][col] === '.' && grid[row][col] === 'O') {
        grid[row - 1][col] = 'O';
        grid[row][col] = '.';
      }
    }
  }
};

for (const line of fileContents) {
  grid.push(line.split(''));
}

let formerGridString = getGridAsString();

while (true) {
  tiltNorth();
  const newGridString = getGridAsString();
  if (formerGridString === getGridAsString()) {
    break;
  }
  formerGridString = newGridString;
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === 'O') {
      sum += grid.length - row
    }
  }
}

console.log(sum);