const fs = require('fs');

const fileContents = fs.readFileSync('./day-2-input.txt', 'utf-8').split('\n');

const MAX_NUMBERS = {
  red: 12,
  green: 13,
  blue: 14
}

let sum = 0;

for (const line of fileContents) {
  const [gameText, cubeText] = line.split(': ');
  const gameId = parseInt(gameText.split(' ')[1]);
  const cubeSets = cubeText.split('; ');
  let possible = true;
  for (const cubeSet of cubeSets) {
    const cubes = cubeSet.split(', ');
    for (const cube of cubes) {
      const [numberText, color] = cube.split(' ');
      const number = parseInt(numberText);
      if (number > MAX_NUMBERS[color]) {
        possible = false;
      }
    }
  }
  if (possible) {
    sum += gameId;
  }
}

console.log(sum);
