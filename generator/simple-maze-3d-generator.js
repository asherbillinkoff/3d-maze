import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";
import Maze3DGenerator from './maze-3d-generator.js';

/**
 * @classdesc This is a simple maze generation algorithm. Walls are randomly
 * assigned to cells and a random path is carved from start to goal.
 */
class SimpleMaze3DGenerator extends Maze3DGenerator {
    /**
     * Simple and random maze generator constructor.
     * @param {*} levels Levels for the maze to generate.
     * @param {*} columns Columns for the maze to generate.
     * @param {*} rows Rows for the maze to generate.
     */
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }
    
    /**
     * Method generates a grid with random wall placements everywhere.
     * It calls another helper function to carve a path from start cell to goal cell.
     * @returns {Maze3D} Object containing the maze and start/goal cell locations.
     */
    generate() {
        const maze = [];
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
                        if (k === 0 && k === this.levels - 1) {
                            currCell.addWall('d', true);
                            currCell.addWall('u', true);
                        }
                        else if (k === 0) {
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
                        else if (i === this.columns - 1) {
                            currCell.addWall('r', true);
                        }
                    }

                    currLevel[j][i] = currCell;
                        
                    // Syncing neighbouring walls with existing cells.
                    // Checks the boolean value of the neighbour's adjacent wall.
                    // Only checking for left, forward and down neighbours to minimize
                    // computations/runtime.
                    if (i > 0 && i < this.columns && currLevel[j][i - 1]) {
                        let leftNeighbourBoolean = currLevel[j][i - 1].walls.get('r');
                        currCell.addWall('l', leftNeighbourBoolean);
                    }
                    if (j > 0 && j < this.rows && currLevel[j - 1][i]) {
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
        // After the random board has been generated, a random path between
        // start and goal must be carved.
        const [finalMaze, start, goal] = this._carveRandomPath(maze);
        return new Maze3D(start, goal, finalMaze);
    }

    /**
     * This method carves a random path from the start cell to the goal cell by
     * calculating a direction vector which orients the carved path to select
     * random 
     * @param {Array} maze Array containing all levels of the maze.
     * @returns {Array} Conatins start cell, goal cell and the maze array.
     */
    _carveRandomPath(maze) {
        // Generate the start and goal cell locations.
        const startCell =  [Math.floor(Math.random() * this.levels),
                            Math.floor(Math.random() * this.rows),
                            Math.floor(Math.random() * this.columns)];
        const goalCell = [Math.floor(Math.random() * this.levels),
                            Math.floor(Math.random() * this.rows),
                            Math.floor(Math.random() * this.columns)];
        maze[startCell[0]][startCell[1]][startCell[2]].updateStatus('s');
        maze[goalCell[0]][goalCell[1]][goalCell[2]].updateStatus('g');
        let currCell = maze[startCell[0]][startCell[1]][startCell[2]];

        // 'directionVector' provides the method with a general sense of what direction
        // the carved path needs to move in order to arrive at the goal cell.
        const directionVector = [startCell[0] - goalCell[0],
                                startCell[1] - goalCell[1],
                                startCell[2] - goalCell[2]];
        let targetDistance = Infinity;
        let neighbour;

        while (targetDistance > 0) {
            targetDistance = (Math.abs(currCell.position[0] - goalCell[0])) +
                             (Math.abs(currCell.position[1] - goalCell[1])) +
                             (Math.abs(currCell.position[2] - goalCell[2]));

            // Variable will select a random number between 0-2 which will
            // select an axis for the path to randomly increment towards.
            let directionChoice = Math.floor(Math.random() * startCell.length);

            if (directionChoice === 0) {
                while (currCell.position[0] !== goalCell[0]) {
                    if (directionVector[0] > 0) {
                        currCell.removeWall('d');
                        neighbour = maze[currCell.position[0] - 1]
                                        [currCell.position[1]]
                                        [currCell.position[2]];
                        neighbour.removeWall('u');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('u');
                        neighbour = maze[currCell.position[0] + 1]
                                        [currCell.position[1]]
                                        [currCell.position[2]];
                        neighbour.removeWall('d');
                        currCell = neighbour;
                    }
                }
            }
            else if (directionChoice === 1) {
                while (currCell.position[1] !== goalCell[1]) {
                    if (directionVector[1] > 0) {
                        currCell.removeWall('f');
                        neighbour = maze[currCell.position[0]]
                                        [currCell.position[1] - 1]
                                        [currCell.position[2]];
                        neighbour.removeWall('b');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('b');
                        neighbour = maze[currCell.position[0]]
                                        [currCell.position[1] + 1]
                                        [currCell.position[2]];
                        neighbour.removeWall('f');
                        currCell = neighbour;
                    }
                }
            }
            else if (directionChoice === 2) {
                while (currCell.position[2] !== goalCell[2]) {
                    if (directionVector[2] > 0) {
                        currCell.removeWall('l');
                        neighbour = maze[currCell.position[0]]
                                        [currCell.position[1]]
                                        [currCell.position[2] - 1];
                        neighbour.removeWall('r');
                        currCell = neighbour;
                    }
                    else {
                        currCell.removeWall('r');
                        neighbour = maze[currCell.position[0]]
                                        [currCell.position[1]]
                                        [currCell.position[2] + 1];
                        neighbour.removeWall('l');
                        currCell = neighbour;
                    }
                }
            }
        }
        return [maze, startCell, goalCell];
    }
    /**
     * This method calculates the total time a generation algorithm takes to run
     * and then prints it to the console.
     */
    measureAlgorithmTime() {}
};

export default SimpleMaze3DGenerator;