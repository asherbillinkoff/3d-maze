import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";
import DFSMaze3DGenerator from './dfs-maze-3d-generator.js';

const maze = new SimpleMaze3DGenerator(2, 2, 2);
//const maze = new DFSMaze3DGenerator(2, 2, 2);
console.log(maze.generate());