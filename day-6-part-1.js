const fs = require('fs');

const times = [53,89,76,98];
const distances = [313, 1090, 1214, 1201];

let product = 1;
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];

  let numWays = 0;
  for (let ms = 0; ms < time; ms++) {
    if ((time - ms) * (ms) > distance) {
      numWays++;
    }
  }
  product *= numWays;
}

console.log(product);