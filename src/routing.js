// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

require('dotenv').config();

const containsValue = value => (acc, curr) => (curr.value === value ? curr : acc);

/**
 * Edge class
 */
class Edge {
  constructor(destination, weight = 1) {
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Vertex class
 */
class Vertex {
  constructor(value = 'vertex') {
    this.value = value;
    this.edges = [];
    this.parent = null;
    this.isVisited = false;
  }
}

/**
 * Graph class
 */
class Graph {
  /**
   * Constructor
   */
  constructor() {
    this.vertexes = [];
  }

  /**
   * This function looks through all the vertexes in the graph and returns the
   * first one it finds that matches the value parameter.
   *
   * Used from the main code to look up the verts passed in on the command
   * line.
   *
   * @param {*} value The value of the Vertex to find
   *
   * @return null if not found.
   */
  findVertex(value) {
    return this.vertexes.reduce(containsValue(value), null); // if vertexes contains value, return that vertex, otherwise, return null
  }

  /**
   * Breadth-First search from a starting vertex. This should keep parent
   * pointers back from neighbors to their parent.
   *
   * @param {Vertex} start The starting vertex for the BFS
   */
  bfs(start) {
    const queue = [start];

    while (this._isNotEmpty(queue)) {
      const currVert = queue.shift();

      if (!currVert.isVisited) {
        currVert.isVisited = true;
      }

      currVert.edges.forEach((edge) => {
        if (!edge.isVisited) {
          edge.isVisited = true;
          edge.parent = currVert;
          queue.push(edge);
        }
      });
    }
  }

  /**
   * Print out the route from the start vert back along the parent
   * pointers (set in the previous BFS)
   *
   * @param {Vertex} vert The starting vertex to follow parent
   *                       pointers from
   */
  outputRoute(vert, route = []) {
    route.push(vert.value);

    if (vert.parent === null) return route.join(' --> ');

    return this.outputRoute(vert.parent, route);
  }

  /**
   * Show the route from a starting vert to an ending vert.
   */
  route(start, end) {
    // Do BFS and build parent pointer tree
    this.bfs(end);

    // Show the route from the start
    return this.outputRoute(start);
  }

  addEdge(v1, v2) {
    v1.edges.push(v2);
    v2.edges.push(v1);
  }

  _isNotEmpty(arr) {
    return arr.length !== 0;
  }
}

/**
 * Main
 */

// Test for valid command line

if (process.env.NODE_ENV !== 'test') {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('usage: routing hostA hostB');
    process.exit(1);
  }

  // Build the entire Internet
  // (it's only a model)
  const graph = new Graph();
  const vertA = new Vertex('HostA');
  const vertB = new Vertex('HostB');
  const vertC = new Vertex('HostC');
  const vertD = new Vertex('HostD');
  const vertE = new Vertex('HostE');
  const vertF = new Vertex('HostF');
  const vertG = new Vertex('HostG');
  const vertH = new Vertex('HostH');

  graph.addEdge(vertA, vertB);
  graph.addEdge(vertB, vertD);
  graph.addEdge(vertA, vertC);
  graph.addEdge(vertC, vertD);
  graph.addEdge(vertC, vertF);
  graph.addEdge(vertG, vertF);
  graph.addEdge(vertE, vertF);
  graph.addEdge(vertH, vertF);
  graph.addEdge(vertH, vertE);

  graph.vertexes.push(vertA);
  graph.vertexes.push(vertB);
  graph.vertexes.push(vertC);
  graph.vertexes.push(vertD);
  graph.vertexes.push(vertE);
  graph.vertexes.push(vertF);
  graph.vertexes.push(vertG);
  graph.vertexes.push(vertH);

  // Look up the hosts passed on the command line by name to see if we can
  // find them.

  const hostAVert = graph.findVertex(args[0]);

  if (hostAVert === null) {
    console.error(`routing: could not find host: ${args[0]}`);
    process.exit(2);
  }

  const hostBVert = graph.findVertex(args[1]);

  if (hostBVert === null) {
    console.error(`routing: could not find host: ${args[1]}`);
    process.exit(2);
  }

  // Show the route from one host to another
  console.log(graph.route(hostAVert, hostBVert));
}

module.exports = { Graph, Vertex };
