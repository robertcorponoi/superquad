'use strict'

const chai = require('chai');
const Superquad = require('../index');

describe('Clearing objects and nodes', () => {

  it('should clear all objects and nodes from the Quad', () => {

    const sq = new Superquad({ x: 0, y: 0, width: 640, height: 480 });

    const grid = 10;

    const gridH = sq.bounds.width / grid;
    const gridV = sq.bounds.height / grid;

    const numObjects = 1000;

    for (let i = 0; i < numObjects; i++) {

      const x = randomInRange(0, gridH) * grid;
      const y = randomInRange(0, gridV) * grid;

      const randomObject = {
        x: x,
        y: y,
        width: randomInRange(1, 4) * grid,
        height: randomInRange(1, 4) * grid,
      };

      sq.add(randomObject);

    }

    sq.clear();

    chai.expect(sq.objects.length).to.equal(0);

  });

});

/**
 * Generate a random number between two numbers.
 * 
 * @param {number} min The minimum number that can be returned.
 * @param {number} max The maximum number that can be returned.
 * 
 * @returns {number}
 */
function randomInRange(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);

}