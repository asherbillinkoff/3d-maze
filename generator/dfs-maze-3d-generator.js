import Maze3DGenerator from "./maze-3d-generator.js";
import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";

class DFSMaze3DGenerator extends Maze3DGenerator {
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }
    generate() {
        const stack = new Array();      // Receives the cell object.
        const visited = new Set();      // Receives the cell position array.
        const maze = [];                // Main maze to store all of the cell objects.
        const [z, y, x] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.levels)];
        const directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'], [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'], ['b', 'f'], ['u', 'd'], ['d', 'u']]);
        const currCell = new Cell(z, y, x);
        visited.add(currCell.position);
        currCell.allWalls();
        stack.push(currCell);

        // Initiate the maze.
        for (let i = 0; i < this.levels; i++) {
            maze.push(Array(this.rows).fill().map(() => Array(this.columns).fill(0)));
        }

        while (stack.length > 0) {
            for (const direction of directions) {
                let neighbour = [z + direction[0], y + direction[1], x + direction[2], direction[3]];
                if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 && neighbour[1] < this.columns && neighbour[2] >= 0 && neighbour[2] < this.rows && !visited.has(neighbour)) {
                    const nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                    //let currPosition = currCell.position;
                    maze[currCell.position[0]][currCell.position[1]][currCell.position[2]] = currCell;
                    currCell.removeWall(neighbour[3]);
                    nextCell.allWalls();
                    nextCell.removeWall(directionPairs.get(neighbour[3]));
                    visited.add(nextCell.position);
                    stack.push(nextCell);
                    currCell = nextCell;
                    [z, y, x] = currCell.position;
                }
            }
            currCell = stack.pop();
        }
        return Maze3D(this.rows, this.columns, this.levels, maze);
    }
};

export default DFSMaze3DGenerator;