var _ = require('lodash');
var Chromosome = require('./chromosome.js');
var Population = require('./population.js');

// goal, population size, num chars to mutate
var population = new Population('Aaron Sullivan wrote this algorithm.', 100, 2);
population.initialize();


_(100000).times(function(i){
  population.mateAll();
  population.sort();
  population.filter();
  if (i % 4 == 0) {
    population.mutateAll();
  }
  console.log('app.js -- iteration ' + i + ' -- best guess: ', population.bestGuess());
  if (population.bestGuess()[0] == 0) {
    process.exit()
  }
})