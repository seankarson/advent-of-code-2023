const fs = require('fs');

const fileContents = fs.readFileSync('./day-4-input.txt', 'utf-8').split('\n');

const cardsToOtherCards = {};

const cardList = [];

for (const line of fileContents) {
  const [cardString, remaining] = line.split(': ');

  const [, cardNumberString] = cardString.split(/\s+/);

  const cardNumber = parseInt(cardNumberString);
  const [winningNumberString, myNumberString] = remaining.split(' | ');
  const winningNumbers = winningNumberString.trim().split(/\s+/).map(s => parseInt(s));
  const myNumbers = myNumberString.trim().split(/\s+/).map(s => parseInt(s));

  let numNumbersInWinningNumbers = 0;
  for (const winningNumber of winningNumbers) {
    if (myNumbers.includes(winningNumber)) {
      numNumbersInWinningNumbers++;
    }
  }
  cardsToOtherCards[cardNumber] = [];
  for (let i = cardNumber + 1; i <= cardNumber + numNumbersInWinningNumbers; i++) {
    cardsToOtherCards[cardNumber].push(i);
  }
  cardList.push(cardNumber);
}

for (let i = 0; i < cardList.length; i++) {
  cardList.push(...cardsToOtherCards[cardList[i]]);
}

console.log(cardList.length);