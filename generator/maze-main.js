import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './dfs-maze-3d-generator.js';
import BFS from './../search-algorithms/bfs.js';
import DFS from './../search-algorithms/dfs.js';
import MazeDomain from './../search-algorithms/searchable-maze-domain.js'; // start, goal, maze

//const maze = new SimpleMaze3DGenerator(1, 10, 10);
const maze = new DFSMaze3DGenerator(1, 10, 10);
//maze.measureAlgorithmTime();
const newMaze = maze.generate();
console.log(newMaze);
newMaze.toString();

// Testing solving algorithms.

function testSearchAlgorithm(searchAlgo, searchable) {
    let solution = searchAlgo.search(searchable);
    //let numOfNodes = searchAlgo.getNumberOfNodes();
    console.log('Solution:', solution[0]);
    console.log('Nodes:', solution[1])
    //console.log('Number of Nodes:', numOfNodes);
    return [solution[0], solution[1]];
}

console.log(testSearchAlgorithm(new DFS(), new MazeDomain(newMaze.startCell, newMaze.goalCell, newMaze)));