const fs = require('fs');

const fileContents = fs.readFileSync('./day-5-input.txt', 'utf-8').split('\n');

const seeds = [];
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

for (const line of fileContents) {
  lineNum++;
  if (lineNum === 1) {
    seeds.push(...line.split(': ')[1].split(' ').map(seedNum => parseInt(seedNum)));
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
  currentMap.push({
    min: sourceRangeStart,
    max: sourceRangeStart + rangeLength - 1,
    modification: destinationRangeStart - sourceRangeStart
  })
}

const locations = []

for (const seed of seeds) {
  let val = seed;
  for (const map of maps) {
    const range = map.find(el => el.min <= val && val <= el.max);
    if (range) {
      val = val + range.modification;
    }
  }
  locations.push(val);
}

console.log(Math.min(...locations));