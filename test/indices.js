'use strict'

const chai = require('chai');
const Quad = require('../index');

describe('Making sure things get put in the right spot', () => {

  it('should get valid indices when inserting objects', () => {

    const quad = new Quad({ x: 0, y: 0, width: 640, height: 480 });

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

      const index = quad.getIndex(randomObject);

      chai.expect(index).to.be.greaterThan(-2) && chai.expect(index).to.be.lessThan(4);

    }

  });

  it('should place objects into the correct quad', () => {

    const quad = new Quad({ x: 0, y: 0, width: 100, height: 100 });

    let index;
    let pass = true;

    const topLeft = {
      x: 1,
      y: 1,
      width: 0,
      height: 0,
    };

    quad.add(topLeft);

    index = quad.getIndex({ x: 1, y: 1, width: 0, height: 0 });

    if (index !== 1) pass = false;

    const topRight = {
      x: 99,
      y: 1,
      width: 0,
      height: 0,
    };

    quad.add(topRight);

    index = quad.getIndex(topRight);

    if (index !== 0) pass = false;

    const botLeft = {
      x: 1,
      y: 99,
      width: 0,
      height: 0,
    };

    quad.add(botLeft);

    index = quad.getIndex(botLeft);

    if (index !== 2) pass = false;

    const botRight = {
      x: 99,
      y: 99,
      width: 0,
      height: 0,
    };

    quad.add(botRight);

    index = quad.getIndex(botRight);

    if (index !== 3) pass = false;

    chai.expect(pass).to.be.true;

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