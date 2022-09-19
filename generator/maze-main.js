import SimpleMaze3DGenerator from "./simple-maze-3d-generator.js";

const maze = new SimpleMaze3DGenerator(4, 4, 2);
console.log(maze.generate());