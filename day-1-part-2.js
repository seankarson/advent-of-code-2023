const fs = require('fs');

const fileContents = fs.readFileSync('./day-1-input.txt', 'utf-8').split('\n');

let sum = 0;

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

const firstDigits = [];
const lastDigits = [];
for (const line of fileContents) {
  for (let i = 0; i < line.length; i++) {
    let found = false;
    if (Number.isInteger(parseInt(line.charAt(i)))) {
      firstDigits.push(parseInt(line.charAt(i)));
      break;
    }
    for (let j = 0; j < numbers.length; j++) {
      if (line.slice(i, i + numbers[j].length) === numbers[j]) {
        firstDigits.push(j + 1);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
}
for (const line of fileContents) {
  for (let i = 0; i < line.length; i++) {
    let found = false;
    if (Number.isInteger(parseInt(line.charAt(line.length - 1 - i)))) {
      lastDigits.push(parseInt(line.charAt(line.length - 1 - i)));
      break;
    }
    for (let j = 0; j < numbers.length; j++) {
      if (line.slice(line.length - 1 - i, line.length - 1 - i + numbers[j].length) === numbers[j]) {
        lastDigits.push(j + 1);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
}

for (let i = 0; i < firstDigits.length; i++) {
  sum += parseInt(`${firstDigits[i]}${lastDigits[i]}`);
}

console.log(sum);