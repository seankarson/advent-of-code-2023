const fs = require('fs');

const fileContents = fs.readFileSync('./day-3-input.txt', 'utf-8').split('\n');

const matrix = [];

for (const line of fileContents) {
  matrix.push(line.split(''));
}

const numbers = [];

for (let rowNum = 0; rowNum < matrix.length; rowNum++) {
  let row = matrix[rowNum];
  let currentNumber = '';
  for (let colNum = 0; colNum < row.length; colNum++) {
    if (/^\d$/.test(row[colNum])) {
      currentNumber += row[colNum];
    } else {
      if (currentNumber.length > 0) {
        numbers.push({
          number: parseInt(currentNumber),
          rowNum,
          startColNum: colNum - currentNumber.length,
          endColNum: colNum - 1
        });
      }

      currentNumber = '';
    }
  }
  if (currentNumber.length > 0) {
    numbers.push({
      number: parseInt(currentNumber),
      rowNum,
      startColNum: row.length - currentNumber.length,
      endColNum: row.length - 1
    });
  }
}

let sum = 0;

const isSymbol = char => char != null && char !== '.' && /^\D$/.test(char);

for (const {number, rowNum, startColNum, endColNum} of numbers) {
  let adjacentToSymbol = isSymbol(matrix[rowNum][startColNum - 1]) || isSymbol(matrix[rowNum][endColNum + 1]);
  for (let col = startColNum - 1; col <= endColNum + 1; col++) {
    if (rowNum > 0) {
      adjacentToSymbol = adjacentToSymbol || isSymbol(matrix[rowNum - 1][col])
    }
    if (rowNum < matrix.length - 1) {
      adjacentToSymbol = adjacentToSymbol || isSymbol(matrix[rowNum + 1][col])
    }
  }
  if (adjacentToSymbol) {
    sum += number;
  }
}
console.log(sum);