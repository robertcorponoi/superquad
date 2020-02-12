'use strict'

const chai = require('chai');
const Superquad = require('../index');

describe('Splitting quads', () => {
  let sq;

  beforeEach(() => sq = new Superquad({ x: 0, y: 0, width: 100, height: 100 }));

  afterEach(() => sq = null);

  it('should split a quad into 4 subquads', () => {
    sq.split();

    chai.expect(sq.nodes.length).to.equal(4);
  });

  it('should not split the same quad twice', () => {
    sq.split();

    sq.split();

    chai.expect(sq.nodes.length).to.equal(4);
  });

  it('should split quads into subnodes as needed', () => {
    sq.split();

    for (let i = 0; i < sq.nodes.length; i++) sq.nodes[i].split();

    chai.expect(sq.totalNodes()).to.equal(20);
  });
});