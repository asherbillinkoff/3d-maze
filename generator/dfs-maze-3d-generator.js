import Maze3DGenerator from "./maze-3d-generator.js";
import Cell from "./cell.js";

class DFSMaze3DGenerator extends Maze3DGenerator {
    constructor(rows, columns, levels) {
        super(rows, columns, levels);
    }
    generate() {
        const stack = new Array();
        const visited = new Set();
        const currLevel = Array(this.rows).fill().map(() => Array(this.columns).fill(0));
        const [z, y, x] = [Math.floor(Math.random()) * this.rows, Math.floor(Math.random()) * this.columns, Math.floor(Math.random()) * this.levels];
        const currCell = new Cell(z, y, x);
        const neighbours = [[z - 1, y, x], [z, y - 1, x], [z, y + 1, x], [z, y, x - 1], [z, y, x + 1],
                            [z + 1, y, x]];
        currCell.allWalls();
        stack.push(currCell);

        while (stack.length > 0) {
            

        }
        

        
    }
    
}

export default DFSMaze3DGenerator;