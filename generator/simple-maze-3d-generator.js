import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";
import Maze3DGenerator from './maze-3d-generator.js';

class SimpleMaze3DGenerator extends Maze3DGenerator {
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }
    
    generate() {

        // Note: edge wall constraints will be dealt with during real-time playing.
        // Maze is an Array containing the 2d slices of mazes. All completed levels pushed into here.
        const maze = [];

        // Left, right, forward, backward, up, down. Using these labels will make interacting with cell maps easier.
        const directions = ['l', 'r', 'f', 'b', 'u', 'd'];
       
        for (let k = 0; k < this.levels; k++) {

            // Array containing the actively constructed level. Reset level for every new k value.
            const currLevel = Array(this.rows).fill().map(() => Array(this.columns).fill(0));
            for (let j = 0; j < this.columns; j++) {
                for (let i = 0; i < this.rows; i++) {
                    let currCell = new Cell(k, j, i);
                    let wallValue;

                    // Iterating over all the directions of the cell to add the walls.
                    for (let d = 0; d < directions.length; d++) {

                         // Generating the random wall placements.
                        wallValue = Boolean(Math.round(Math.random()));
                        currCell.addWall(directions[d], wallValue);
                    }

                    currLevel[i][j] = currCell;
                        
                    // Syncing neighbouring walls with existing cells.
                    if (i > 0 && i < this.rows && currLevel[i - 1][j]) {
                        let forwardNeighbourBoolean = currLevel[i - 1][j].walls.get('b');
                        currCell.addWall('f', forwardNeighbourBoolean);
                    }
                    if (j > 0 && j < this.columns && currLevel[i][j - 1]) {
                        let leftNeighbourBoolean = currLevel[i][j - 1].walls.get('r')
                        currCell.addWall('l', leftNeighbourBoolean);
                    }
                    if (k > 0 && k < this.levels) {
                        let downNeighbourBoolean = maze[k - 1][j][i].walls.get('u');
                        currCell.addWall('d', downNeighbourBoolean);
                    }
                }
            }
            maze.push(currLevel);
        }
        // After the random board has been generated, a random path between start and finish must be carved.
        const [finalMaze, start, finish] = this._carveRandomPath(maze);
        return new Maze3D(this.rows, this.columns, this.levels, finalMaze);
    }

    _carveRandomPath(maze) {
        // This algorithm will search through neighbours of the current cell and select based on the closest distance to the finish cell.
        // If the neighbour is closer to the finish cell, then it will be selected as the new current cell.
        const startCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        const finishCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        const currCell = maze[startCell[0]][startCell[1]][startCell[2]];
        const visited = new Set();
        const directions = [[-1, 0, 0, 'd'], [0, - 1, 0, 'f'], [0, 1, 0, 'b'], [0, 0, - 1, 'l'], [0, 0, 1, 'r'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'], ['b', 'f'], ['u', 'd'], ['d', 'u']]);
        const directionVector = [startCell[0] - finishCell[0], startCell[1] - finishCell[1], startCell[2] - finishCell[2]];
        let neighbour; // Do i need this here?

        while (currCell.position !== finishCell) {
            // Variable will select a random number between 0-2 which will select an axis for the path to randomly move.
            let directionChoice = Math.floor(Math.random() * startCell.length);

            if (directionChoice === 0) {
                while (currCell.position[0] !== finishCell[0]) {
                    if (directionVector[0] > 0) {
                        currCell.removeWall('d');
                        neighbour = maze[currCell.position[0] - 1][currCell.position[1]][currCell.position[2]];
                        neighbour.removeWall('u');
                    }
                    else {
                        currCell.removeWall('u');
                        neighbour = maze[currCell.position[0] + 1][currCell.position[1]][currCell.position[2]];
                        neighbour.removeWall('d');
                    }
                }
            }
            else if (directionChoice === 1) {
                while (currCell.position[1] !== finishCell[1]) {
                    if (directionVector[1] > 0) {
                        currCell.removeWall('f');
                        neighbour = maze[currCell.position[0]][currCell.position[1] - 1][currCell.position[2]];
                        neighbour.removeWall('b');
                    }
                    else {
                        currCell.removeWall('b');
                        neighbour = maze[currCell.position[0]][currCell.position[1] + 1][currCell.position[2]];
                        neighbour.removeWall('f');
                    }
                }
            }
            else if (directionChoice === 2) {
                while (currCell.position[2] !== finishCell[2]) {
                    if (directionVector[2] > 0) {
                        currCell.removeWall('l');
                        neighbour = maze[currCell.position[0]][currCell.position[1]][currCell.position[2] - 1];
                        neighbour.removeWall('r');
                    }
                    else {
                        currCell.removeWall('r');
                        neighbour = maze[currCell.position[0]][currCell.position[1]][currCell.position[2] + 1];
                        neighbour.removeWall('l');
                    }
                }
            }
        }
        return [maze, startCell, finishCell];
    }
};

export default SimpleMaze3DGenerator;