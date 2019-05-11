'use strict'

const chai = require('chai');
const Quad = require('../index');

describe('Deleting objects after retrieving', () => {

  it('should return intersection collisions and delete them afterwards', () => {

    const quad = new Quad({ x: 0, y: 0, width: 640, height: 480 });

    quad.add({ x: 1, y: 1, width: 10, height: 10 });
    quad.add({ x: 5, y: 5, width: 10, height: 10 });
    quad.add({ x: 10, y: 10, width: 10, height: 10 });
    quad.add({ x: 15, y: 15, width: 10, height: 10 });

    quad.getIntersections({ x: 5, y: 5, width: 2.5, height: 2.5 }, true);

    const expected = [
      { x: 10, y: 10, width: 10, height: 10 },
      { x: 15, y: 15, width: 10, height: 10 }
    ];

    chai.expect(quad.objects).to.deep.equal(expected);

  });

});