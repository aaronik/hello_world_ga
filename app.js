const _ = require('lodash');

class Chromosome {
  constructor() {
    this.code = '';
  }

  // replace chromosome's code with random chars of length `length`
  randomizeCode(length) {
    while (length--){
      this.code += this._randomChar();
    }
  };

  // calculate distance chromosome is from a given goal
  calcCostAgainst(goal) {
    let linearDiff, geneCost;
    let totalCost = 0;

    this.code.split('').forEach((char, i) => {
      linearDiff = char.charCodeAt(0) - goal.charCodeAt(i);
      geneCost = linearDiff * linearDiff;
      totalCost += geneCost;
    });

    return totalCost;
  };

  // `numChars` times, randomly replace a character from code
  mutate(numChars) {
    const randomIndex = Math.floor(Math.random() * this.code.length);
    const randomChar = this._randomChar();

    _(numChars).times(() => {
      this.code = this._swapChar(randomIndex, randomChar);
    }, this);
  };

  // replace whatever character is at `index` with `newChar`
  _swapChar(index, newChar) {
    return this.code.slice(0, index) + newChar + this.code.slice(index + 1);
  };

  // return a random character
  _randomChar() {
    return String.fromCharCode(Math.floor(Math.random()*255));
  };
}

class Population {
  constructor(goal, populationSize, numMutationChars) {
    this.members = [];
    this.goal = goal;                         // to calculate cost against
    this.populationSize = populationSize;     // how many members
    this.numMutationChars = numMutationChars; // details about mutation
  }

  initialize() {
    // generate the population
    _(this.populationSize).times(i => {
      this.members.push(new Chromosome());
    }, this);

    // initialize the population
    this.members.forEach(member => {
      member.randomizeCode(this.goal.length);
    }, this);
  }

  // sort by fitness function
  sort() {
    this.members = _.sortBy(this.members, member => {
      return member.calcCostAgainst(this.goal);
    }, this);
  };

  // pair off from best fitness to worst, mate members
  mateAll() {
    let member1, member2;

    for(let i = 0; i <= this.populationSize - 2; i += 2) {
      member1 = this.members[i];
      member2 = this.members[i+1];
      this.members = this.members.concat(this._mate(member1, member2));
    }

  };

  // mutate every member
  mutateAll() {
    this.members.forEach(member => {
      member.mutate(this.numMutationChars);
    })
  };

  // cut out all but top this.populationSize num members
  cull() {
    this.members = this.members.slice(0, this.populationSize);
  };

  // return most fit member with cost
  bestGuess() {
    const bestChromosome = this._bestChromosome();
    return [bestChromosome.calcCostAgainst(this.goal), bestChromosome.code];
  };

  // return most fit member
  _bestChromosome() {
    return this.members[0];
  };

  // mate two members
  _mate(chromo1, chromo2) {
    const pivot = Math.floor(this.goal.length / 2);

    const child1 = new Chromosome();
    const child2 = new Chromosome();

    // mating algorithm
    child1.code = chromo1.code.slice(0, pivot) + chromo2.code.slice(pivot);
    child2.code = chromo2.code.slice(0, pivot) + chromo1.code.slice(pivot);


    return [child1, child2];
  };
}

// goal, population size, num chars to mutate
const population = new Population('Unblocked Ledger Coin Rules!', 75, 4);

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
