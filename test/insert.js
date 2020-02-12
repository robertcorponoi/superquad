'use strict'

const chai = require('chai');
const Quad = require('../index');

describe('Inserting objects into quads', () => {
  let quad;

  beforeEach(() => quad = new Quad({ x: 0, y: 0, width: 640, height: 480 }));

  afterEach(() => quad = null);

  it('should insert 1000 objects into the quad', () => {
    const grid = 10;

    const gridH = quad.bounds.width / grid;
    const gridV = quad.bounds.height / grid;

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

      quad.add(randomObject);
    }

    chai.expect(quad.total).to.equal(numObjects);
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