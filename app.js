const _ = require('lodash');
const Chromosome = require('./chromosome.js');
const Population = require('./population.js');

// goal, population size, num chars to mutate
const population = new Population('Hello, Toptal!', 75, 4);

population.initialize();

for (let i = 0; true; i++) {

  population.mateAll();
  population.sort();
  population.cull();

  // every once in a while introduce population-wide random mutation
  if (i % 4 == 0) population.mutateAll();

  const [ cost, bestGuess ] = population.bestGuess();

  console.log(`iteration ${i}, best guess: "${bestGuess}" (cost: ${cost})`);

  // if we've arrived at the desired result, exit the program
  if (population.bestGuess()[0] == 0) process.exit();
}
