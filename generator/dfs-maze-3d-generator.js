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
        let startCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        let [z, y, x] = startCell;
        let finishCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        let directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'], [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'], ['b', 'f'], ['u', 'd'], ['d', 'u']]);
        let currCell = new Cell(z, y, x);
        let nextCell;
        currCell.updateStatus('s');
        visited.add([z, y, x].toString());
        currCell.allWalls();
        stack.push(currCell);

        // Initiate the maze.
        for (let i = 0; i < this.levels; i++) {
            maze.push(Array(this.rows).fill().map(() => Array(this.columns).fill(new Cell(0,0,0))));
        }
        maze[z][y][x] = currCell;

        while (stack.length > 0) {
            for (let i = 0; i < directions.length; i++) {
                let neighbour = [z + directions[i][0], y + directions[i][1], x + directions[i][2], directions[i][3]];
                if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 && neighbour[1] < this.columns && neighbour[2] >= 0 && neighbour[2] < this.rows && visited.has(neighbour.slice(0,3).toString()) === false) {
                    if (neighbour.slice(0,3).toString() === finishCell.toString()) {
                        nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                        nextCell.updateStatus('g');
                        maze[nextCell.position[0]][nextCell.position[1]][nextCell.position[2]] = nextCell;
                        return new Maze3D(this.rows, this.columns, this.levels, maze);
                    }
                    nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                    currCell.removeWall(neighbour[3]);
                    nextCell.allWalls();
                    nextCell.removeWall(directionPairs.get(neighbour[3]));
                    maze[nextCell.position[0]][nextCell.position[1]][nextCell.position[2]] = nextCell;
                    visited.add(nextCell.position.toString());
                    //if (visited.has(nextCell.position.toString()))
                    stack.push(nextCell);
                    currCell = nextCell;
                    [z, y, x] = currCell.position;
                    directions = this._randomize(directions);
                }
            }
            currCell = stack.pop();
        }
        //maze[currCell.position[0]][currCell.position[1]][currCell.position[2]].updateStatus('g');
        //return new Maze3D(this.rows, this.columns, this.levels, maze);
    };

    _randomize(arr) {
        for (let i = 0; i < arr.length; i++) {
            let randIdx = Math.floor(Math.random() * arr.length);
            let temp = arr[randIdx];
            arr[randIdx] = arr[arr.length - 1 - randIdx];
            arr[arr.length - 1 - randIdx] = temp;
        }
        return arr;
    }
};

export default DFSMaze3DGenerator;