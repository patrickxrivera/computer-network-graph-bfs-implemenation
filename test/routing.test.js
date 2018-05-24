/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const { Graph, Vertex } = require('../src/routing');

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should find the vertex that matches the value parameter', () => {
    const vertA = new Vertex('HostA');
    const vertB = new Vertex('HostB');
    graph.addEdge(vertA, vertB);
    graph.vertexes.push(vertA, vertB);
    expect(graph.findVertex(vertA.value).value).toBe('HostA');
  });

  it('should return null when an invalid value is given', () => {
    const vertA = new Vertex('HostA');
    const vertB = new Vertex('HostB');
    graph.addEdge(vertA, vertB);
    graph.vertexes.push(vertA, vertB);
    expect(graph.findVertex('Invalid value')).toBe(null);
  });
});
