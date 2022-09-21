import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './dfs-maze-3d-generator.js';

const maze = new SimpleMaze3DGenerator(3, 3, 3);
//const maze = new DFSMaze3DGenerator(2, 2, 2);
const newMaze = maze.generate();
console.log(newMaze);
newMaze.toString();