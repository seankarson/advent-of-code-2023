const fs = require('fs');

const fileContents = fs.readFileSync('./day-8-input.txt', 'utf-8').split('\n');

const instructions = 'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'.split('');

const instructionMap = {};

for (const line of fileContents) {
  const key = line.slice(0,3);
  const left = line.slice(7,10);
  const right = line.slice(12,15);
  instructionMap[key] = [left, right];
}

let currentKey = 'AAA';

let count = 0;

while (currentKey !== 'ZZZ') {
  for (const instruction of instructions) {
    currentKey = instructionMap[currentKey][instruction === 'L' ? 0 : 1];
    count++;
    if (currentKey === 'ZZZ') {
      break;
    }
  }
}

console.log(count);