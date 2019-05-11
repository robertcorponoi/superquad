'use strict'

const chai = require('chai');
const Quad = require('../index');

describe('Retrieving objects and collisions', () => {

  it('should retrieve possible collisions', () => {

    const quad = new Quad({ x: 0, y: 0, width: 640, height: 480 });

    let randomObject;
    const numObjects = 100;

    for (let i = 0; i < numObjects; i++) {

      randomObject = {
        x: i,
        y: i,
        width: 0,
        height: 0,
      };

      quad.add(randomObject);

    }

    for (let j = 0; j < numObjects; j++) {

      const cursor = {
        x: j,
        y: j,
        width: 0,
        height: 0,
      };

      const objects = quad.get(cursor);

      let found = false;

      if (objects.length >= numObjects) throw new Error();

      for (let o = 0; o < objects.length; o++) {

        if (objects[o].x == j && objects[o].y == j) found = true;

      }

      chai.expect(found).to.be.true;

    }

  });

  it('should return point collisions', () => {

    const quad = new Quad({ x: 0, y: 0, width: 640, height: 480 });

    const numObjects = 1000;

    for (let i = 0; i < numObjects; i++) {

      const randomObject = {
        x: i,
        y: i,
        width: 0,
        height: 0,
      };

      quad.add(randomObject);

    }

    let failed = false;

    const iterations = 20;

    for (let j = 1; j < iterations; j++) {

      const cursor = {
        x: j,
        y: j,
        width: 0,
        height: 0,
      };

      const points = quad.getPoints(cursor);

      for (const point of points) {

        if (point.x == 0) failed = true;

        if (point.y == 0) failed = true;

        if (!point.isPoint()) failed = true;

      }

      chai.expect(failed).to.be.false;

    }

  });

  it('should return intersection collisions', () => {

    const quad = new Quad({ x: 0, y: 0, width: 640, height: 480 });

    quad.add({ x: 1, y: 1, width: 10, height: 10 });
    quad.add({ x: 5, y: 5, width: 10, height: 10 });
    quad.add({ x: 10, y: 10, width: 10, height: 10 });
    quad.add({ x: 15, y: 15, width: 10, height: 10 });

    const intersections = quad.getIntersections({ x: 5, y: 5, width: 2.5, height: 2.5 });

    chai.expect(intersections.length).to.equal(2);

  });

});