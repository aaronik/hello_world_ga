var _ = require('lodash');

function Chromosome(){
  this.code = '';
  this.id = _.uniqueId();
};

Chromosome.prototype.randomizeCode = function(length){
  while (length--){
    this.code += this._randomChar();
  }
};

Chromosome.prototype.calcCostAgainst = function(goal){
  var linearDiff, geneCost;
  var totalCost = 0;

  this.code.split('').forEach(function(char, i){
    linearDiff = char.charCodeAt(0) - goal.charCodeAt(i);
    geneCost = linearDiff * linearDiff;
    totalCost += geneCost;
  });


  return totalCost;
};

Chromosome.prototype.mutate = function(numChars){ // could add mutation degree
  var randomIndex = Math.floor(Math.random() * this.code.length);
  var randomChar = this._randomChar();
  
  _(numChars).times(function(){
    this.code = this._swapChar(randomIndex, randomChar);
  }, this);
};

Chromosome.prototype._swapChar = function(index, newChar){
  return this.code.slice(0, index) + newChar + this.code.slice(index + 1);
};

Chromosome.prototype._randomChar = function(){
  return String.fromCharCode(Math.floor(Math.random()*255));
};

module.exports = Chromosome;