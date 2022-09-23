import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './dfs-maze-3d-generator.js';

//const maze = new SimpleMaze3DGenerator(5, 5, 5);
const maze = new DFSMaze3DGenerator(3, 4, 4);
//maze.measureAlgorithmTime();
const newMaze = maze.generate();
console.log(newMaze);
newMaze.toString();