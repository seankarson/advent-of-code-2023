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
  let formerGridString = getGridAsString();

  while (true) {
    for (let row = 1; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row - 1][col] === '.' && grid[row][col] === 'O') {
          grid[row - 1][col] = 'O';
          grid[row][col] = '.';
        }
      }
    }

    const newGridString = getGridAsString();
    if (formerGridString === getGridAsString()) {
      break;
    }
    formerGridString = newGridString;
  }
};

const tiltSouth = () => {
  let formerGridString = getGridAsString();

  while (true) {
    for (let row = grid.length - 2; row >= 0; row--) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row + 1][col] === '.' && grid[row][col] === 'O') {
          grid[row + 1][col] = 'O';
          grid[row][col] = '.';
        }
      }
    }

    const newGridString = getGridAsString();
    if (formerGridString === getGridAsString()) {
      break;
    }
    formerGridString = newGridString;
  }
};

const tiltWest = () => {
  let formerGridString = getGridAsString();

  while (true) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 1; col < grid[0].length; col++) {
        if (grid[row][col - 1] === '.' && grid[row][col] === 'O') {
          grid[row][col - 1] = 'O';
          grid[row][col] = '.';
        }
      }
    }

    const newGridString = getGridAsString();
    if (formerGridString === getGridAsString()) {
      break;
    }
    formerGridString = newGridString;
  }
};

const tiltEast = () => {
  let formerGridString = getGridAsString();

  while (true) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = grid[0].length - 2; col >= 0; col--) {
        if (grid[row][col + 1] === '.' && grid[row][col] === 'O') {
          grid[row][col + 1] = 'O';
          grid[row][col] = '.';
        }
      }
    }

    const newGridString = getGridAsString();
    if (formerGridString === getGridAsString()) {
      break;
    }
    formerGridString = newGridString;
  }
};

for (const line of fileContents) {
  grid.push(line.split(''));
}

const repeats = new Map();

repeats.set(getGridAsString(), 0);

let firstCycleIteration, secondCycleIteration;

for (let i = 1; i <= 1000000000; i++) {
  tiltNorth();
  tiltWest();
  tiltSouth();
  tiltEast();

  const gridString = getGridAsString();

  if (repeats.has(gridString)) {
    firstCycleIteration = repeats.get(gridString);
    secondCycleIteration = i;
    break;
  }
  repeats.set(gridString, i);
}

const cycleLength = secondCycleIteration - firstCycleIteration;
const numExtraIterations = (1000000000 - firstCycleIteration) % cycleLength;

for (let i = 1; i <= numExtraIterations; i++) {
  tiltNorth();
  tiltWest();
  tiltSouth();
  tiltEast();
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === 'O') {
      sum += grid.length - row
    }
  }
}

console.log(sum);