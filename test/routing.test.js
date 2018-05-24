/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const Graph = require('../src/routing');

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should return true', () => {
    expect(true).toBe(true);
  });
});
