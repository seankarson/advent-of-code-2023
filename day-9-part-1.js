const fs = require('fs');

const fileContents = fs.readFileSync('./day-9-input.txt', 'utf-8').split('\n');

const getReducedLine = (numbers) => {
  let currentNumbers = numbers;
  let result = [currentNumbers];

  while (currentNumbers.some(val => val !== 0)) {
    let newCurrentNumbers = [];

    for (let i = 1; i < currentNumbers.length; i++) {
      newCurrentNumbers.push(currentNumbers[i] - currentNumbers[i - 1]);
    }

    result.push(newCurrentNumbers);
    currentNumbers = newCurrentNumbers;
  }
  return result;
}

let sum = 0;
for (const line of fileContents) {
  const reducedLine = getReducedLine(line.split(' ').map(val => parseInt(val)));

  let finalValue = 0;
  for (let i = reducedLine.length - 1; i > 0; i--) {
    const valueToAdd = reducedLine[i][reducedLine[i].length - 1] + reducedLine[i - 1][reducedLine[i - 1].length - 1];
    finalValue = valueToAdd;
    reducedLine[i - 1].push(valueToAdd);
  }
  sum += finalValue;
}

console.log(sum);