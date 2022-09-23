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
            for (let j = 0; j < this.rows; j++) {
                for (let i = 0; i < this.columns; i++) {
                    let currCell = new Cell(k, j, i);
                    let wallValue;

                    // Iterating over all the directions of the cell to add the walls.
                    for (let d = 0; d < directions.length; d++) {

                        // Generating the random wall placements.
                        wallValue = Boolean(Math.round(Math.random()));
                        currCell.addWall(directions[d], wallValue);

                        // Making sure all boundary cells have walls in the correct spots.
                        if (k === 0) {
                            currCell.addWall('d', true);
                        }
                        else if (k === this.levels - 1) {
                            currCell.addWall('u', true);
                        }

                        if (j === 0) {
                            currCell.addWall('f', true);
                        }
                        else if (j === this.rows - 1) {
                            currCell.addWall('b', true);
                        }

                        if (i === 0) {
                            currCell.addWall('l', true);
                        }
                        else if (j === this.columns - 1) {
                            currCell.addWall('r', true);
                        }
                    }

                    currLevel[j][i] = currCell;
                        
                    // Syncing neighbouring walls with existing cells.
                    if (i > 0 && i < this.rows && currLevel[j][i - 1]) {
                        let leftNeighbourBoolean = currLevel[j][i - 1].walls.get('r');
                        currCell.addWall('l', leftNeighbourBoolean);
                    }
                    if (j > 0 && j < this.columns && currLevel[j - 1][i]) {
                        let forwardNeighbourBoolean = currLevel[j - 1][i].walls.get('b')
                        currCell.addWall('f', forwardNeighbourBoolean);
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
        const startCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        const finishCell = [Math.floor(Math.random() * this.levels), Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
        maze[startCell[0]][startCell[1]][startCell[2]].updateStatus('s');
        maze[finishCell[0]][finishCell[1]][finishCell[2]].updateStatus('g');
        let currCell = maze[startCell[0]][startCell[1]][startCell[2]];
        const directionVector = [startCell[0] - finishCell[0], startCell[1] - finishCell[1], startCell[2] - finishCell[2]];
        let targetDistance = Infinity;
        let neighbour;

        while (targetDistance > 0) {
            targetDistance = (Math.abs(currCell.position[0] - finishCell[0])) + (Math.abs(currCell.position[1] - finishCell[1])) + (Math.abs(currCell.position[2] - finishCell[2]));
            // Variable will select a random number between 0-2 which will select an axis for the path to randomly move.
            let directionChoice = Math.floor(Math.random() * startCell.length);

            if (directionChoice === 0) {
                while (currCell.position[0] !== finishCell[0]) {
                    if (directionVector[0] > 0) {
                        currCell.removeWall('d');
                        neighbour = maze[currCell.position[0] - 1][currCell.position[1]][currCell.position[2]];
                        neighbour.removeWall('u');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('u');
                        neighbour = maze[currCell.position[0] + 1][currCell.position[1]][currCell.position[2]];
                        neighbour.removeWall('d');
                        currCell = neighbour;
                    }
                }
            }
            else if (directionChoice === 1) {
                while (currCell.position[1] !== finishCell[1]) {
                    if (directionVector[1] > 0) {
                        currCell.removeWall('f');
                        neighbour = maze[currCell.position[0]][currCell.position[1] - 1][currCell.position[2]];
                        neighbour.removeWall('b');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('b');
                        neighbour = maze[currCell.position[0]][currCell.position[1] + 1][currCell.position[2]];
                        neighbour.removeWall('f');
                        currCell = neighbour;
                    }
                }
            }
            else if (directionChoice === 2) {
                while (currCell.position[2] !== finishCell[2]) {
                    if (directionVector[2] > 0) {
                        currCell.removeWall('l');
                        neighbour = maze[currCell.position[0]][currCell.position[1]][currCell.position[2] - 1];
                        neighbour.removeWall('r');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('r');
                        neighbour = maze[currCell.position[0]][currCell.position[1]][currCell.position[2] + 1];
                        neighbour.removeWall('l');
                        currCell = neighbour;
                    }
                }
            }
        }
        return [maze, startCell, finishCell];
    }

    measureAlgorithmTime() {
        const start = Date.now();
        this.generate();
        const end = Date.now();
        console.log(`The maze took ${end - start} ms to generate.`);
    }
};

export default SimpleMaze3DGenerator;