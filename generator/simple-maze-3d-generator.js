import Cell from "./cell.js";
import Maze3D from "./maze-3d.js";
import Maze3DGenerator from './maze-3d-generator.js';

class SimpleMaze3DGenerator extends Maze3DGenerator {
    constructor(rows, columns, levels) {
        super(rows, columns, levels);
    }
    
    generate() {

        // Note: edge wall constraints will be dealt with during real-time playing.
        // Array containing the 2d slices of mazes. All completed levels pushed into here.
        const maze = [];

        // Left, right, forward, backward, up, down. Using these labels will make ineracting with cell maps easier.
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
        const newMaze = new Maze3D(this.rows, this.columns, this.levels, maze);
        return newMaze;
    }
};

export default SimpleMaze3DGenerator;