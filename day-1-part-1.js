const fs = require('fs');

const fileContents = fs.readFileSync('./day-1-input.txt', 'utf-8').split('\n');

let sum = 0;

for (const line of fileContents) {
  let digits = line.replace(/\D/g, '');
  sum += parseInt(`${digits.charAt(0)}${digits.charAt(digits.length - 1)}`);
}

console.log(sum);