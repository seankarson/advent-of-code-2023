const fs = require('fs');

const fileContents = fs.readFileSync('./day-10-input.txt', 'utf-8').split('\n');

const possibleValues = [
  // '-',
  '|',
  // 'J',
  // 'L',
  // 'F',
  // '7'
]

const grid = [];
let sCoordinates;

for (const line of fileContents) {
  const splitLine = line.split('');
  if (splitLine.includes('S')) {
    sCoordinates = [grid.length, splitLine.indexOf('S')];
  }
  grid.push(line.split(''));
}

const c = coordinates => coordinates.join(',');

for (const possibleValue of possibleValues) {
  const visitedSpaces = new Set([c(sCoordinates)]);
  const spacesToVisit = [{
    coordinates: sCoordinates,
    distance: 0
  }];

  const canVisit = (row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !visitedSpaces.has(c([row, col]));
  }

  for (let i = 0; i < spacesToVisit.length; i++) {
    const distance = spacesToVisit[i].distance;
    const coordinates = spacesToVisit[i].coordinates;
    visitedSpaces.add(c(coordinates));
    const row = coordinates[0];
    const col = coordinates[1];
    const value = row === sCoordinates[0] && col === sCoordinates[1] ? possibleValue : grid[row][col];

    if (value === '-') {
      if (canVisit(row, col + 1) && ['-', '7', 'J'].includes(grid[row][col + 1])) {
        spacesToVisit.push({
          coordinates: [row, col + 1],
          distance: distance + 1
        })
      }
      if (canVisit(row, col - 1) && ['-', 'F', 'L'].includes(grid[row][col - 1])) {
        spacesToVisit.push({
          coordinates: [row, col - 1],
          distance: distance + 1
        })
      }
    }

    if (value === '|') {
      if (canVisit(row + 1, col) && ['|', 'L', 'J'].includes(grid[row + 1][col])) {
        spacesToVisit.push({
          coordinates: [row + 1, col],
          distance: distance + 1
        })
      }
      if (canVisit(row - 1, col) && ['|', 'F', '7'].includes(grid[row - 1][col])) {
        spacesToVisit.push({
          coordinates: [row - 1, col],
          distance: distance + 1
        })
      }
    }

    if (value === 'L') {
      if (canVisit(row - 1, col) && ['|', 'F', '7'].includes(grid[row - 1][col])) {
        spacesToVisit.push({
          coordinates: [row - 1, col],
          distance: distance + 1
        })
      }
      if (canVisit(row, col + 1) && ['-', '7', 'J'].includes(grid[row][col + 1])) {
        spacesToVisit.push({
          coordinates: [row, col + 1],
          distance: distance + 1
        })
      }
    }

    if (value === '7') {
      if (canVisit(row + 1, col) && ['|', 'L', 'J'].includes(grid[row + 1][col])) {
        spacesToVisit.push({
          coordinates: [row + 1, col],
          distance: distance + 1
        })
      }
      if (canVisit(row, col - 1) && ['-', 'L', 'F'].includes(grid[row][col - 1])) {
        spacesToVisit.push({
          coordinates: [row, col - 1],
          distance: distance + 1
        })
      }
    }

    if (value === 'J') {
      if (canVisit(row - 1, col) && ['|', 'F', '7'].includes(grid[row - 1][col])) {
        spacesToVisit.push({
          coordinates: [row - 1, col],
          distance: distance + 1
        })
      }
      if (canVisit(row, col - 1) && ['-', 'F', 'L'].includes(grid[row][col - 1])) {
        spacesToVisit.push({
          coordinates: [row, col - 1],
          distance: distance + 1
        })
      }
    }

    if (value === 'F') {
      if (canVisit(row + 1, col) && ['|', 'L', 'J'].includes(grid[row + 1][col])) {
        spacesToVisit.push({
          coordinates: [row + 1, col],
          distance: distance + 1
        })
      }
      if (canVisit(row, col + 1) && ['-', '7', 'J'].includes(grid[row][col + 1])) {
        spacesToVisit.push({
          coordinates: [row, col + 1],
          distance: distance + 1
        })
      }
    }
  }

  console.log(spacesToVisit[spacesToVisit.length - 1]);
}