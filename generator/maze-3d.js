import Cell from './cell.js'

class Maze3D {
    constructor(rows, columns, levels, maze) {
        this.rows = rows;
        this.columns = columns;
        this.levels = levels;
        this.maze = maze;
    }
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
                currRow += '|';
                console.log(currRow);
                currRow = '';

                // Check the status of the backward walls (BwBorder) of the cell.
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

            // Print the backward wall.
            console.log(header);
            header = '';
        }
    }
}

export default Maze3D;