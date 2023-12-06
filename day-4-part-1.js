const fs = require('fs');

const fileContents = fs.readFileSync('./day-4-input.txt', 'utf-8').split('\n');

let sum = 0;
for (const line of fileContents) {
  const [, remaining] = line.split(': ');
  const [winningNumberString, myNumberString] = remaining.split(' | ');
  const winningNumbers = winningNumberString.trim().split(/\s+/).map(s => parseInt(s));
  const myNumbers = myNumberString.trim().split(/\s+/).map(s => parseInt(s));

  let numNumbersInWinningNumbers = 0;
  for (const winningNumber of winningNumbers) {
    if (myNumbers.includes(winningNumber)) {
      numNumbersInWinningNumbers++;
    }
  }
  if (numNumbersInWinningNumbers > 0) {
    sum += 2 ** (numNumbersInWinningNumbers - 1);
  }
}

console.log(sum);