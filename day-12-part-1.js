const fs = require('fs');

const fileContents = fs.readFileSync('./day-12-input.txt', 'utf-8').split('\n');

const isValidLine = (springs, numbers) => {
  return springs.split(/[.]+/g).map(section => section.length).filter(val => val !== 0).join(',') === numbers.join(',');
}

const decToBin = (dec) => {
  return (dec >>> 0).toString(2);
}

const numPossibilities = (springs, numbers) => {
  const numUnknowns = springs.filter(spring => spring === '?').length;

  const numPossibilities = 2 ** numUnknowns;

  let numValidLines = 0;

  for (let i = 0; i < numPossibilities; i++) {
    const binary = decToBin(i).padStart(numUnknowns, '0').split('');

    let attempt = '';
    let numBinaryUsed = 0;
    for (const char of springs) {
      if (char === '?') {
        attempt += binary[numBinaryUsed] === '0' ? '.' : '#';
        numBinaryUsed++;
      } else {
        attempt += char;
      }
    }

    if (isValidLine(attempt, numbers)) {
      numValidLines++;
    }
  }

  return numValidLines;
}

let sum = 0;

for (const line of fileContents) {
  const [allSprings, commaNumbers] = line.split(' ');
  const numbers = commaNumbers.split(',');
  const springs = allSprings.split('');

  sum += numPossibilities(springs, numbers);
}

console.log(sum);