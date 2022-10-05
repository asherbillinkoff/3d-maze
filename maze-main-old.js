// import PrimMaze3DGenerator from "./generator/prim-maze-3d-generator.js";
import SimpleMaze3DGenerator from './generator/simple-maze-3d-generator.js';
// import DFSMaze3DGenerator from './generator/dfs-maze-3d-generator.js';
// import BFS from './search-algorithms/bfs.js';
// import DFS from './search-algorithms/dfs.js';
// import AStar from './search-algorithms/a-star.js';
// import MazeDomain from './search-algorithms/searchable-maze-domain.js';
// import PriorityQueue from './search-algorithms/priority-queue.js';
// import SearchDemo from "./search-algorithms/search-demo.js";

// Testing maze generation.

const maze = new SimpleMaze3DGenerator(3, 10, 10);
// const maze = new DFSMaze3DGenerator(1, 10, 10);
// const maze = new PrimMaze3DGenerator(1, 5, 5);
// maze.measureAlgorithmTime();
const newMaze = maze.generate();
console.log(newMaze);
newMaze.toString();

// Testing solving algorithms.

// function testSearchAlgorithm(searchAlgo, searchable) {
//     let solution = searchAlgo.search(searchable);
//     let numOfNodes = searchAlgo.getNumberOfNodes();
//     console.log(searchAlgo.type)
//     console.log(solution[0]);
//     console.log(solution[1]);
//     console.log(numOfNodes);
//     return [solution, numOfNodes];
// }

// testSearchAlgorithm(new DFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));
// testSearchAlgorithm(new BFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze)); // Past ~ 10,000 cells it breaks.
// testSearchAlgorithm(new AStar(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze));

// const newDemo = new SearchDemo(5, 100, 100);

// newDemo.run();