'use strict'

const chai = require('chai');
const Quad = require('../index');

describe('Creating Quads', () => {

  it('should create a new Quad with the default settings', () => {

    const qt = new Quad({
      x: 0,
      y: 0,
      width: 640,
      height: 480,
    });

    chai.expect(qt.bounds).to.deep.equal({ x: 0, y: 0, width: 640, height: 480 }) && chai.expect(qt.options.maxObjects).to.equal(10) && chai.expect(qt.options.maxLevels).to.equal(4) && chai.expect(qt.level).to.equal(0) && chai.expect(qt.nodes).to.deep.equal([]) && chai.expect(qt.objects).to.deep.equal([]);

  });

  it('should create a new Quad with custom amounts for max levels and max objects', () => {

    const options = { maxObjects: 5, maxLevels: 2 };

    const qt = new Quad({
      x: 0,
      y: 0,
      width: 640,
      height: 480,
    }, options);

    chai.expect(qt.bounds).to.deep.equal({ x: 0, y: 0, width: 640, height: 480 }) && chai.expect(qt.options.maxObjects).to.equal(5) && chai.expect(qt.options.maxLevels).to.equal(2) && chai.expect(qt.level).to.equal(0) && chai.expect(qt.nodes).to.deep.equal([]) && chai.expect(qt.objects).to.deep.equal([]);

  })

});