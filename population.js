const _ = require('lodash');
const Chromosome = require('./chromosome.js');

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

module.exports = Population;
