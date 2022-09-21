import Maze3DGenerator from "./maze-3d-generator.js";
import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";

class DFSMaze3DGenerator extends Maze3DGenerator {
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }
    generate() {
        const stack = new Array();
        const visited = new Set();
        const maze = [];
        let [z, y, x] = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        const directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'], [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'], ['b', 'f'], ['u', 'd'], ['d', 'u']]);
        let currCell = new Cell(z, y, x);
        currCell.addWall('s', true);
        visited.add([z, y, x].toString());
        currCell.allWalls();
        stack.push(currCell);

        // Initiate the maze.
        for (let i = 0; i < this.levels; i++) {
            maze.push(Array(this.rows).fill().map(() => Array(this.columns).fill(0)));
        }
        maze[z][y][x] = currCell;

        while (stack.length > 0) {
            for (let i = 0; i < directions.length; i++) {
                let neighbour = [z + directions[i][0], y + directions[i][1], x + directions[i][2], directions[i][3]];
                if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 && neighbour[1] < this.columns && neighbour[2] >= 0 && neighbour[2] < this.rows && visited.has(neighbour.slice(0,3).toString()) === false) {
                    let nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                    currCell.removeWall(neighbour[3]);
                    nextCell.allWalls();
                    nextCell.removeWall(directionPairs.get(neighbour[3]));
                    maze[nextCell.position[0]][nextCell.position[1]][nextCell.position[2]] = nextCell;
                    visited.add(nextCell.position.toString());
                    stack.push(nextCell);
                    currCell = nextCell;
                    [z, y, x] = currCell.position;
                    i = -1;
                }
            }
            currCell = stack.pop();
        }
        currCell.addWall('g', true);
        return new Maze3D(this.rows, this.columns, this.levels, maze);
    }
};

export default DFSMaze3DGenerator;