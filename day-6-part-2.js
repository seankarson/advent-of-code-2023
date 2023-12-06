const fs = require('fs');

const TIME = 53897698;
const DISTANCE = 313109012141201;

let numWays = 0;
for (let ms = 0; ms < TIME; ms++) {
  if ((TIME - ms) * (ms) > DISTANCE) {
    numWays++;
  }
}

console.log(numWays);