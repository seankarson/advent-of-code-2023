const fs = require('fs');

const fileContents = fs.readFileSync('./day-8-input.txt', 'utf-8').split('\n');

const instructions = 'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'.split('');

const instructionMap = {};

for (const line of fileContents) {
  const key = line.slice(0, 3);
  const left = line.slice(7, 10);
  const right = line.slice(12, 15);
  instructionMap[key] = [left, right];
}

let keys = Object.keys(instructionMap).filter(key => key.endsWith('A'));
let counts = []

for (const key of keys) {
  let count = 0;
  let currentKey = key;
  while (!currentKey.endsWith('Z')) {
    for (const instruction of instructions) {
      currentKey = instructionMap[currentKey][instruction === 'L' ? 0 : 1];
      count++;
      if (currentKey.endsWith('Z')) {
        break;
      }
    }
  }
  counts.push(count);
}

const lcm = (num1, num2) => {
  let i = 1;
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);

  while (!Number.isInteger(min * i / max)) {
    i++;
  }

  return min * i;
}

console.log(
  lcm(lcm(lcm(lcm(lcm(counts[0], counts[1]), counts[2]), counts[3]), counts[4]), counts[5])
);