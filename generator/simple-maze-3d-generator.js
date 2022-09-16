import Cell from "./cell";

class SimpleMaze3DGenerator extends Maze3DGenerator {
    constructor() {
        super(rows, columns, levels);
        this.rows = rows;               // equals the size of the y-axis
        this.columns = this.columns;    // equals the size of the x-axis
        this.levels = levels;           // equals the size of the z-axis
    }
    
    generate() {

        // Note: edge wall constraints will be dealt with during real-time playing.

        // Array containing the 2d slices of mazes. All completed levels pushed here.
        const maze = [];

        // Array containing the actively constructed level.
        const currLevel = [[]];

        // Left, right, forward, backward, up, down
        const directions = ['l', 'r', 'f', 'b', 'u', 'd'];

       
        for (let k = 0; i < this.levels; i++) {
            for (let j = 0; j < this.columns; j++) {
                for (let i = 0; i < this.rows; i++) {

                    // Iterating over all the directions of the cell to add the walls.
                    for (let d = 0; d < directions.length; d++) {
                        let currCell = new Cell(k, j, i);

                         // Generating the random wall placements.
                        let booleans = [Boolean(Math.round(Math.random)), Boolean(Math.round(Math.random)),
                            Boolean(Math.round(Math.random)), Boolean(Math.round(Math.random)),
                            Boolean(Math.round(Math.random)), Boolean(Math.round(Math.random))];
                        currLevel[i][j] = currCell.addWall(directions[d], booleans[d]);
                        
                        // Syncing neighbouring walls with existing cells.
                        if (i > 0 && i < this.rows && currCell[i - 1][j]) {
                            let forwardNeighbourBoolean = currLevel[i - 1][j].walls[3];
                            currCell.addWall('f', forwardNeighbourBoolean);
                        }
                        if (j > 0 && j < this.columns && currCell[i][j - 1]) {
                            let leftNeighbourBoolean = currLevel[i][j - 1].walls[1];
                            currCell.addWall('l', leftNeighbourBoolean);
                        }
                        if (k > 0 && k < this.levels) {
                            let downNeighbourBoolean = maze[k - 1][i][j].walls[4];
                            currCell.addWall('l', downNeighbourBoolean);
                        }
                    }
                }
            }
            maze.push(level);
            level = [[]];
        }
    }
}

export default SimpleMaze3DGenerator;