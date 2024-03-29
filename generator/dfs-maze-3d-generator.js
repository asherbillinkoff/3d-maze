import Maze3DGenerator from "./maze-3d-generator.js";
import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";

/**
 * @classdesc This is a Depth First Search (DFS) maze generation algorithm.
 * In order to add variation to the search pattern, the neighbouring cells
 * are explored in a random order.
 */
class DFSMaze3DGenerator extends Maze3DGenerator {
    /**
     * DFS generator constructor.
     * @param {Number} levels Levels for the maze to generate.
     * @param {Number} columns Columns for the maze to generate.
     * @param {Number} rows Rows for the maze to generate.
     */
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }

    /**
     * Method to generate the maze.
     * @returns {Maze3D} Object containing the maze and start/goal locations.
     */
    generate() {
        const maze = [];
        const stack = new Array();
        const visited = new Set();

        // Select random cells for the maze start and goal. Mark cell with an 's' for start.
        let startCell = [Math.floor(Math.random() * this.levels),
                         Math.floor(Math.random() * this.rows),
                         Math.floor(Math.random() * this.columns)];
        let [z, y, x] = startCell;
        let currCell = new Cell(z, y, x);
        currCell.updateStatus('s');
        currCell.allWalls();
        stack.push(currCell);
        let goalCell = [Math.floor(Math.random() * this.levels),
                        Math.floor(Math.random() * this.rows),
                        Math.floor(Math.random() * this.columns)];

        // To make sure that the start and goal cells are never the same.
        while (startCell.toString() === goalCell.toString()) {
            goalCell = [Math.floor(Math.random() * this.levels),
                        Math.floor(Math.random() * this.rows),
                        Math.floor(Math.random() * this.columns)];
        }
        
        // "directions" contains all possible directions for each maze cell.
        // "directionPairs" allows the method to fetch the complement of each
        // direction when removing walls of adjacent cells.
        let directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'],
                          [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'],
                                        ['b', 'f'], ['u', 'd'], ['d', 'u']]);
        let nextCell;
        visited.add([z, y, x].toString());


        // Initiate the maze with empty cell objects with all walls set to 'true'.
        const fillerCell = new Cell(0,0,0);
        fillerCell.allWalls();
        for (let i = 0; i < this.levels; i++) {
            maze.push(Array(this.rows).fill().map(() => Array(this.columns).fill(fillerCell)));
        }
        maze[z][y][x] = currCell;
        while (stack.length > 0) {
            for (let i = 0; i < directions.length; i++) {

                // Add the potential move direction coordinates to the current cell location.
                // Validate that all potential neighbours are within the maze and are not in the visited set.
                let neighbour = [z + directions[i][0], y + directions[i][1],
                                x + directions[i][2], directions[i][3]];
                if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 && 
                    neighbour[1] < this.rows && neighbour[2] >= 0 && neighbour[2] < this.columns && 
                    visited.has(neighbour.slice(0,3).toString()) === false) {
                    
                    // If the neighbour position is equal to goal cell then return the maze.
                    if (neighbour.slice(0,3).toString() === goalCell.toString()) {
                        nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                        nextCell.updateStatus('g');
                        nextCell.allWalls();
                        nextCell.removeWall(directionPairs.get(neighbour[3]));
                        currCell.removeWall(neighbour[3]);
                        maze[nextCell.position[0]][nextCell.position[1]][nextCell.position[2]] = nextCell;
                        return new Maze3D(startCell, goalCell, maze);
                    }
                    
                    // Remove adjacent walls between current and next cell.
                    // All new neighbour cells to contain all walls.
                    currCell.removeWall(neighbour[3]);
                    nextCell = new Cell(neighbour[0], neighbour[1], neighbour[2]);
                    nextCell.allWalls();
                    nextCell.removeWall(directionPairs.get(neighbour[3]));
                    maze[nextCell.position[0]][nextCell.position[1]][nextCell.position[2]] = nextCell;
                    visited.add(nextCell.position.toString());
                    stack.push(nextCell);
                    currCell = nextCell;
                    [z, y, x] = currCell.position;
                    directions = this._randomize(directions);
                    i = -1;
                }
            }
            currCell = stack.pop();
            [z, y, x] = currCell.position;
        }
    };

    /**
     * Randomize the neighbouring cell.
     * @param {Array} arr Array of all possible directions for the next move.
     * @returns {Array} Modified array with elements in random order.
     */
    _randomize(arr) {
        for (let i = 0; i < arr.length; i++) {
            let randIdx = Math.floor(Math.random() * arr.length);
            let temp = arr[randIdx];
            arr[randIdx] = arr[arr.length - 1 - randIdx];
            arr[arr.length - 1 - randIdx] = temp;
        }
        return arr;
    }

    measureAlgorithmTime() {}
};

export default DFSMaze3DGenerator;