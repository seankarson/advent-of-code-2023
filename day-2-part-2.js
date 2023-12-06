const fs = require('fs');

const fileContents = fs.readFileSync('./day-2-input.txt', 'utf-8').split('\n');

let sum = 0;

for (const line of fileContents) {
  const [, cubeText] = line.split(': ');
  const cubeSets = cubeText.split('; ');
  const minCounts = {
    red: 0,
    green: 0,
    blue: 0,
  }
  for (const cubeSet of cubeSets) {
    const cubes = cubeSet.split(', ');
    for (const cube of cubes) {
      const [numberText, color] = cube.split(' ');
      const number = parseInt(numberText);
      minCounts[color] = Math.max(number, minCounts[color]);
    }
  }
  sum += minCounts.red * minCounts.green * minCounts.blue;
}

console.log(sum);
