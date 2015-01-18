var _ = require('lodash');
var Chromosome = require('./chromosome.js');

var Population = function (goal, populationSize, numMutationChars) {
	this.members = [];
	this.goal = goal;
	this.populationSize = populationSize;
	this.numMutationChars = numMutationChars;
};

Population.prototype.initialize = function () {
	// generate the population
	_(this.populationSize).times(function(i){
		this.members.push(new Chromosome());
	}, this);

	// initialize the population
	this.members.forEach(function(member){
		member.randomizeCode(this.goal.length);
	}, this);
};

Population.prototype.sort = function(){
	this.members = _.sortBy(this.members, function(member){
		return member.calcCostAgainst(this.goal);
	}, this);
};

Population.prototype.mateAll = function(){
	var member1, member2;

	for(var i = 0; i <= this.populationSize - 2; i += 2) {
		member1 = this.members[i];
		member2 = this.members[i+1];
		this.members = this.members.concat(this._mate(member1, member2));
	}

};

Population.prototype.mutateAll = function(){
	var that = this;

	this.members.forEach(function(member){
		member.mutate(that.numMutationChars);
	});
};

Population.prototype.mutateRandom = function(){
	randomIndex = Math.floor(Math.random() * this.members.length)

	this.members[randomIndex].mutate(this.numMutationChars);
};

Population.prototype.filter = function(){ // cut out all but top this.populationSize num members
	this.members = this.members.slice(0, this.populationSize);
};

Population.prototype.bestGuess = function(){
	return [this._bestChromosome().calcCostAgainst(this.goal), this._bestChromosome().code];
};

Population.prototype._bestChromosome = function(){
	return this.members[0];
};

Population.prototype._mate = function (chromo1, chromo2) {
	var pivot = Math.floor(this.goal.length / 2);

	var child1 = new Chromosome();
	var child2 = new Chromosome();

	child1.code = chromo1.code.slice(0, pivot) + chromo2.code.slice(pivot);
	child2.code = chromo2.code.slice(0, pivot) + chromo1.code.slice(pivot);


	return [child1, child2];
};

module.exports = Population;