// import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './generator/dfs-maze-3d-generator.js';
import BFS from './search-algorithms/bfs.js';
import DFS from './search-algorithms/dfs.js';
import MazeDomain from './search-algorithms/searchable-maze-domain.js';
import PriorityQueue from './search-algorithms/priority-queue.js';
// import SearchDemo from "./search-algorithms/search-demo.js";

// Testing maze generation.

// const maze = new SimpleMaze3DGenerator(5, 10, 10);
const maze = new DFSMaze3DGenerator(1, 10, 10);
// const maze = new PrimMaze3DGenerator(1, 5, 5);
// maze.measureAlgorithmTime();
const newMaze = maze.generate();
console.log(newMaze);
newMaze.toString();

// Testing solving algorithms.

function testSearchAlgorithm(searchAlgo, searchable) {
    let solution = searchAlgo.search(searchable);
    let numOfNodes = searchAlgo.getNumberOfNodes();
    console.log(solution);
    console.log(numOfNodes);
    return [solution, numOfNodes];
}

testSearchAlgorithm(new DFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));
testSearchAlgorithm(new BFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));

// Testing a priority queue.

const pq = new PriorityQueue();
const numbers = [1, 8, 4, 10, 20, 18, 7];
pq.push(...numbers);
pq.pop();
pq.pop();
pq.pop();
const popped = pq.pop();
console.log(pq);
console.log(popped);

// const newDemo = new SearchDemo(5, 100, 100);

// newDemo.run();