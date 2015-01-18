My very first genetic algorithm.

### To run:

```sh
npm install
node app.js
```

### A bit about wtf

There are three main things going on here:

1) A fitness function (or in this case, a cost function) - something to let us know how far from right on the money we are
2) A mating algorithm - some way to take two of the children, genes or chromosomes and combine aspects of themselves to make an offspring
3) A mutation algorithm - a way to introduce random noise to the system to spur genetic growth and make sure we stay away from local maxima/minima
