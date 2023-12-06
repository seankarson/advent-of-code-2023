const fs = require('fs');

const fileContents = fs.readFileSync('./day-3-input.txt', 'utf-8').split('\n');

const matrix = [];

for (const line of fileContents) {
  matrix.push(line.split(''));
}

const numbers = [];
const gears = [];

for (let rowNum = 0; rowNum < matrix.length; rowNum++) {
  let row = matrix[rowNum];
  let currentNumber = '';
  for (let colNum = 0; colNum < row.length; colNum++) {
    if (row[colNum] === '*') {
      gears.push({rowNum, colNum});
    }

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

for (const {rowNum, colNum} of gears) {
  const connectedNumbers = [];

  for (const {rowNum: numberRowNum, startColNum, endColNum, number} of numbers) {
    const numberCells = [];
    for (let i = startColNum; i <= endColNum; i++) {
      numberCells.push(`${numberRowNum}-${i}`);
    }
    if (
      (rowNum > 0 && numberCells.includes(`${rowNum - 1}-${colNum - 1}`)) ||
      (rowNum > 0 && numberCells.includes(`${rowNum - 1}-${colNum}`)) ||
      (rowNum > 0 && numberCells.includes(`${rowNum - 1}-${colNum + 1}`)) ||
      (rowNum < matrix.length && numberCells.includes(`${rowNum + 1}-${colNum - 1}`)) ||
      (rowNum < matrix.length && numberCells.includes(`${rowNum + 1}-${colNum}`)) ||
      (rowNum < matrix.length && numberCells.includes(`${rowNum + 1}-${colNum + 1}`)) ||
      numberCells.includes(`${rowNum}-${colNum - 1}`) ||
      numberCells.includes(`${rowNum}-${colNum + 1}`)
    ) {
      connectedNumbers.push(number);
    }
  }

  if (connectedNumbers.length === 2) {
    sum += connectedNumbers[0] * connectedNumbers[1];
  }
}
console.log(sum);