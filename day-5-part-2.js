const fs = require('fs');

const fileContents = fs.readFileSync('./day-5-input.txt', 'utf-8').split('\n');

const seedsMap = [];
const seedToSoilMap = [];
const soilToFertilizerMap = [];
const fertilizerToWaterMap = [];
const waterToLightMap = [];
const lightToTemperatureMap = [];
const temperatureToHumidityMap = [];
const humidityToLocationMap = [];

const maps = [
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap
]

let lineNum = 0;
let mapIndex = 0;
let currentMap;
let maxSeedNumberTransformation = 0;

for (const line of fileContents) {
  lineNum++;
  if (lineNum === 1) {
    continue;
  }
  if (!line) {
    continue;
  }
  if (line.includes('map')) {
    currentMap = maps[mapIndex];
    mapIndex++;
    continue;
  }
  const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ').map(num => parseInt(num));
  maxSeedNumberTransformation = Math.max(maxSeedNumberTransformation, sourceRangeStart + rangeLength - 1);
  currentMap.push({
    min: sourceRangeStart,
    max: sourceRangeStart + rangeLength - 1,
    destinationMin: destinationRangeStart,
    destinationMax: destinationRangeStart + rangeLength - 1,
    modification: destinationRangeStart - sourceRangeStart
  })
}

const seedLine = fileContents[0];

const seedsAndRanges = seedLine.split(': ')[1].split(' ').map(seedNum => parseInt(seedNum));
for (let i = 0; i < seedsAndRanges.length / 2; i++) {
  const initialSeedNumber = seedsAndRanges[2 * i];
  const seedRange = seedsAndRanges[2 * i + 1];
  seedsMap.push({
    min: initialSeedNumber,
    max: initialSeedNumber + seedRange - 1
  });
}

const reversedMaps = maps.reverse();

let possibleMinAnswer = 0;
while (true) {
  let tracked = possibleMinAnswer;
  for (const map of reversedMaps) {
    const found = map.find(el => el.destinationMin <= tracked && tracked <= el.destinationMax);
    if (found) {
      tracked = tracked - found.modification;
    }
  }
  if (seedsMap.find(el => el.min <= tracked && tracked <= el.max)) {
    console.log(possibleMinAnswer);
    break;
  }
  possibleMinAnswer++;
}