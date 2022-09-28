import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './dfs-maze-3d-generator.js';
import PrimMaze3DGenerator from './prim-maze-3d-generator';
import BFS from './../search-algorithms/bfs.js';
import DFS from './../search-algorithms/dfs.js';
import MazeDomain from './../search-algorithms/searchable-maze-domain.js';
import Heap2 from "../search-algorithms/heap2.js";
import SearchDemo from "../search-algorithms/search-demo.js";

// Testing maze generation.

// const maze = new SimpleMaze3DGenerator(5, 10, 10);
// const maze = new DFSMaze3DGenerator(1, 10, 10);
const maze = new PrimMaze3DGenerator(1, 5, 5);
// maze.measureAlgorithmTime();
const newMaze = maze.generate();
console.log(newMaze);
// newMaze.toString();

// Testing solving algorithms.

// function testSearchAlgorithm(searchAlgo, searchable) {
//     let solution = searchAlgo.search(searchable);
//     let numOfNodes = searchAlgo.getNumberOfNodes();
//     console.log(solution);
//     console.log(numOfNodes);
//     return [solution, numOfNodes];
// }

// testSearchAlgorithm(new DFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));
// testSearchAlgorithm(new BFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));

// Testing a priority queue.

// const mh = new Heap2();

// mh.add(1);
// mh.add(2);
// mh.add(3);
// mh.add(10);
// mh.add(4);
// mh.add(20);
// mh.add(9);
// console.log(mh.peek());
// console.log(mh.poll());
// console.log(mh);

// const newDemo = new SearchDemo(5, 100, 100);

// newDemo.run();