import Cell from './cell.js'
import Maze3DGenerator from './maze-3d-generator.js';
import Maze3D from './maze-3d.js';

class PrimMaze3DGenerator extends Maze3DGenerator {
    /**
     * Prim maze generator constructor.
     * @param {Number} levels Levels for the maze to generate.
     * @param {Number} columns Columns for the maze to generate.
     * @param {Number} rows Rows for the maze to generate.
     */
    constructor(levels, columns, rows) {
        super(levels, columns, rows);
    }

    generate() {
        // Start with all walls.
        // Pick a cell, add it to maze, add neighbours of currCell to list.
        // While neighbours.length > 0.
        // Pick a random node from neighbour list.
        // Find the corresponding node ALREADY in the maze.
        // Clear walls between that random neighbour and existing node.
        // Add neighbours of random node to neighbours list.

        const maze = [];
        const visited = new Set();
        const neighbours = [];
        let startCell = [Math.floor(Math.random() * this.levels),
                        Math.floor(Math.random() * this.columns),
                        Math.floor(Math.random() * this.rows)];
        let [z, y, x] = startCell;
        neighbours.push(startCell);
        visited.add(startCell.toString());
        let currCell = new Cell(z, y, x);
        currCell.updateStatus('s');
        currCell.allWalls();
        let goalCell = [Math.floor(Math.random() * this.levels),
                        Math.floor(Math.random() * this.columns),
                        Math.floor(Math.random() * this.rows)];

        // To make sure that the start and goal cells are never the same.
        while (startCell.toString() === goalCell.toString()) {
            goalCell = [Math.floor(Math.random() * this.levels),
                        Math.floor(Math.random() * this.columns),
                        Math.floor(Math.random() * this.rows)];
        }
        
        // "directions" contains all possible directions for each maze cell.
        // "directionPairs" allows the method to fetch the complement of each
        // move when removing walls of adjacent cells.
        let directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'],
                          [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const directionPairs = new Map ([['l', 'r'], ['r', 'l'], ['f', 'b'],
                                        ['b', 'f'], ['u', 'd'], ['d', 'u']]);

        // Initiate the maze with empty cell objects.
        const fillerCell = new Cell(0,0,0);
        fillerCell.allWalls();
        for (let i = 0; i < this.levels; i++) {
            maze.push(Array(this.rows).fill().map(() => Array(this.columns).fill(fillerCell)));
        }

        maze[z][y][x] = currCell;

        while (neighbours.length > 0) {
            for (let i = 0; i < directions.length; i++) {

                // Add all valid neighbours to the "neighbours" list.
                // Validate that all options are within the maze and are not in the visited set.
                let neighbour = [z + directions[i][0], y + directions[i][1],
                                x + directions[i][2], directions[i][3]];
                if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 &&
                    neighbour[1] < this.columns && neighbour[2] >= 0 && neighbour[2] < this.rows && 
                    !visited.has(neighbour.slice(0,3).toString())) {
                        neighbours.push(neighbour);
                }
            }

            // Pick random cell in the "neighbours" array. 
            let randomIndex = Math.floor(Math.random() * neighbours.length);
            let currNeighbour = neighbours[randomIndex];
            neighbours.splice(randomIndex);
            visited.add(currNeighbour.slice(0,3).toString());

            // Construct new cell object to be added to the maze.
            [z, y, x, ] = currNeighbour;
            currCell = new Cell(z, y, x);
            currCell.allWalls();
            currCell.removeWall(directionPairs.get(currNeighbour[3]));
            if (currNeighbour.slice(0,3).toString === goalCell.toString()) {
                currCell.updateStatus('g');
            }
            maze[z][y][x] = currCell;

            // Remove the adjacent wall for the existing cell already in the maze.
            // Since currNeighbour contains the direction label we can search for
            // the proper direction vector in our "directions" array to find the
            // location of the previous cell.
            let zp, yp, xp;
            for (const direction of directions) {
                if (direction.includes(directionPairs.get(currNeighbour[3])) === true) {
                    [zp, yp, xp] = [z + direction[0], y + direction[1], x + direction[2]];
                    break;
                }
            }
            maze[zp][yp][xp].removeWall(currNeighbour[3]);
        }
        return new Maze3D(startCell, goalCell, maze);
    }
};

export default PrimMaze3DGenerator;