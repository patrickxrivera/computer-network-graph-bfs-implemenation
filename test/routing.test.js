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

  it('assigns correct parent during breadth-first-search', () => {
    const vertA = new Vertex('HostA');
    const vertB = new Vertex('HostB');
    const vertC = new Vertex('HostC');
    const vertD = new Vertex('HostD');
    const vertE = new Vertex('HostE');
    graph.addEdge(vertA, vertC);
    graph.addEdge(vertA, vertB);
    graph.addEdge(vertC, vertD);
    graph.addEdge(vertC, vertE);
    graph.vertexes.push(vertA, vertB, vertC, vertD, vertE);
    graph.bfs(vertD);
    expect(vertB.parent).toBe(vertA);
    expect(vertA.parent).toBe(vertC);
    expect(vertE.parent).toBe(vertC);
    expect(vertC.parent).toBe(vertD);
  });

  it('outputs correct route using bfs and outputRoute', () => {
    const vertA = new Vertex('HostA');
    const vertB = new Vertex('HostB');
    const vertC = new Vertex('HostC');
    const vertD = new Vertex('HostD');
    const vertE = new Vertex('HostE');
    graph.addEdge(vertA, vertC);
    graph.addEdge(vertA, vertB);
    graph.addEdge(vertC, vertD);
    graph.addEdge(vertC, vertE);
    graph.vertexes.push(vertA, vertB, vertC, vertD, vertE);
    graph.bfs(vertD);
    expect(graph.outputRoute(vertB)).toBe('HostB --> HostA --> HostC --> HostD');
    expect(graph.outputRoute(vertE)).toBe('HostE --> HostC --> HostD');
  });

  it('outputs correct route using route', () => {
    const vertA = new Vertex('HostA');
    const vertB = new Vertex('HostB');
    const vertC = new Vertex('HostC');
    const vertD = new Vertex('HostD');
    const vertE = new Vertex('HostE');
    graph.addEdge(vertA, vertC);
    graph.addEdge(vertA, vertB);
    graph.addEdge(vertC, vertD);
    graph.addEdge(vertC, vertE);
    graph.vertexes.push(vertA, vertB, vertC, vertD, vertE);
    expect(graph.route(vertB, vertD)).toBe('HostB --> HostA --> HostC --> HostD');
    expect(graph.route(vertE, vertD)).toBe('HostE --> HostC --> HostD');
  });
});
