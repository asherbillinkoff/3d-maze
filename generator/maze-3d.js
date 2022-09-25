/**
 * @classdesc This class contains the maze array which stores all of the
 * cell and wall information. It also contains parameters of the maze.
 */
class Maze3D {
    /**
     * 
     * @param {Array} startCell Array contain start coordinates.
     * @param {Array} goalCell Array containg goal cell coordinates.
     * @param {Array} maze Array containing the maze.
     */
    constructor(startCell, goalCell, maze) {
        this.startCell = startCell;
        this.goalCell = goalCell;
        this.maze = maze;
        this.levels = this.maze.length;
        this.columns = this.maze[0][0].length;
        this.rows = this.maze[0].length;
    }

    /**
     * Prints all of the 2D slices of the maze levels to the console.
     */
    toString() {
        let header = '';
        let currRow = '';
        let currBwBorder = '';
        let currCell;

        for (let k = 0; k < this.levels; k++) {
            console.log('Level ', k, '\n');

            // Print the forward wall.
            for (let j = 0; j < this.columns; j++) {
                header += " _";
            }
            console.log(header);

            for (let j = 0; j < this.rows; j++) {
                for (let i = 0; i < this.columns; i++) {
                    currCell = this.maze[k][j][i];

                    // Check the wall status for the left side of the cell.
                    if (i === 0 || currCell.walls.get('l') === true) {
                        currRow += '|';
                    }
                    else {
                        currRow += ' ';
                    }

                    // Separate if statement to check the wall status for the up down walls.
                    if (currCell.checkStatus('s') === true) {
                        currRow += 'S';
                    }
                    else if (currCell.checkStatus('g') === true) {
                        currRow += 'G';
                    }
                    else if (currCell.walls.get('u') === false && currCell.walls.get('d') === false) {
                        currRow += '↕';
                    }
                    else if (currCell.walls.get('u') === false && currCell.walls.get('d') === true) {
                        currRow += '↑';
                    }
                    else if (currCell.walls.get('u') === true && currCell.walls.get('d') === false) {
                        currRow += '↓';
                    }
                    else {
                        currRow += ' ';
                    }
                }
                // Last element on the right of each row will always be a wall, thus the line below.
                currRow += '|';
                console.log(currRow);
                currRow = '';

                // If method is printing last row then we want to skip printing of currBwBorder.
                if (j === this.rows - 1) {
                    // Print the backward wall.
                    console.log(header);
                    header = '';
                }
                else {
                    // Check the status of the backward border (BwBorder) of the cell.
                    currBwBorder += '|';
                    for (let i = 0; i < this.columns; i++) {
                        if (this.maze[k][j][i].walls.get('b') === true) {
                            currBwBorder += '-';
                        }
                        else {
                            currBwBorder += ' ';
                        }

                        if (i !== this.columns - 1) {
                            currBwBorder += '+';
                        }
                    }
                    currBwBorder += '|';
                    console.log(currBwBorder);
                    currBwBorder = '';
                }
            }
        }
    }
};

export default Maze3D;