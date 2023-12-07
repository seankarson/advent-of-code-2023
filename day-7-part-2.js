const fs = require('fs');

const fileContents = fs.readFileSync('./day-7-input.txt', 'utf-8').split('\n');

const hands = [];

for (const line of fileContents) {
  const splitLine = line.split(' ');
  hands.push({hand: splitLine[0], bid: parseInt(splitLine[1])});
}

const cardValues = {
  A: 13,
  K: 12,
  Q: 11,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
}

const getHandRank = hand => {
  const frequencies = {
    A: 0,
    K: 0,
    Q: 0,
    J: 0,
    T: 0,
    9: 0,
    8: 0,
    7: 0,
    6: 0,
    5: 0,
    4: 0,
    3: 0,
    2: 0,
  };

  const cards = hand.split('');
  for (const card of cards) {
    if (card !== 'J') {
      frequencies[card]++;
    }
  }

  const sortedCounts = Object.values(frequencies).filter(freq => freq !== 0).sort((a, b) => b - a).join('');
  
  if (sortedCounts === '5' || sortedCounts === '4' || sortedCounts === '3' || sortedCounts === '2' || sortedCounts === '1' || sortedCounts === '') {
    return 7;
  } else if (sortedCounts === '41' || sortedCounts === '31' || sortedCounts === '21' || sortedCounts === '11') {
    return 6;
  } else if (sortedCounts === '32' || sortedCounts === '22') {
    return 5;
  } else if (sortedCounts === '311' || sortedCounts === '211' || sortedCounts === '111') {
    return 4;
  } else if (sortedCounts === '221') {
    return 3;
  } else if (sortedCounts === '2111' || sortedCounts === '1111') {
    return 2;
  } else {
    return 1;
  }
};

hands.sort((a,b) => {
  if (getHandRank(a.hand) !== getHandRank(b.hand)) {
    return getHandRank(a.hand) - getHandRank(b.hand);
  }
  for (let i = 0; i < 5; i++) {
    if (a.hand.charAt(i) !== b.hand.charAt(i)) {
      return cardValues[a.hand.charAt(i)] - cardValues[b.hand.charAt(i)]
    }
  }
})

let sum = 0;

hands.forEach((hand, i) => {
  sum += hand.bid * (i + 1);
});

console.log(sum);