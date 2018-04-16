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

module.exports = Chromosome;
