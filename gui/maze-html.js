import DFSMaze3DGenerator from "../generator/dfs-maze-3d-generator.js";
import SimpleMaze3DGenerator from "../generator/simple-maze-3d-generator.js";


class MazeHTML {
    constructor(elem, levels, cols, rows, genAlgo, playerIcon) {
        this.elem = elem;
        this.levels = levels;
        this.cols = cols;
        this.rows = rows;
        this.genAlgo = genAlgo;
        this.startCell = [];
        this.icon = playerIcon
    }

    createMaze() {
        let generatedMaze;

        // Generate the maze based on the user input from the HTML forms.
        if (this.genAlgo === 'dfs') {
            const dfsGen = new DFSMaze3DGenerator(this.levels, this.cols, this.rows);
            generatedMaze = dfsGen.generate();
            this.startCell = generatedMaze.startCell;          
        }
        else if (this.genAlgo === 'simple') {
            const simpleGen = new SimpleMaze3DGenerator(this.levels, this.cols, this.rows);
            generatedMaze = simpleGen.generate();
            this.startCell = generatedMaze.startCell;
        }

        // Construct the html elements of the maze for each level.
        const mazeHTML = document.createElement('div');
        for (let k = 0; k < this.levels; k++) {
            const level = document.createElement('div');
            level.className = 'level';
            level.id = 'Level' + String(k + 1);
            if (k !== 0) {
                level.hidden = true;
            }
            for (let j = 0; j < this.rows; j++) {
                const row = document.createElement('div');
                row.className = 'row';
                level.appendChild(row);
                for (let i = 0; i < this.cols; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    row.appendChild(cell);
                    const directions = ['r', 'l', 'f', 'b', 'u', 'd'];

                    // Check for start and goal cells.
                    if (generatedMaze.maze[k][j][i].checkStatus('s')) {
                        cell.textContent = 'S';
                    }
                    else if (generatedMaze.maze[k][j][i].checkStatus('g')) {
                        cell.textContent = 'G';
                    }

                    // Decorate each cell with correct border walls.
                    for (const direction of directions) {
                        if (generatedMaze.maze[k][j][i].walls.get(direction)) {
                            if (direction === 'r') {
                                cell.style.borderRight = 'cyan solid 0.5px';
                            }
                            else if (direction === 'l') {
                                cell.style.borderLeft = 'cyan solid 0.5px';
                            }
                            else if (direction === 'f') {
                                cell.style.borderTop = 'cyan solid 0.5px';
                            }
                            else if (direction === 'b') {
                                cell.style.borderBottom = 'cyan solid 0.5px';    
                            }
                            else if (!generatedMaze.maze[k][j][i].walls.get('u') &&
                                     !generatedMaze.maze[k][j][i].walls.get('d')) {
                                cell.textContent = '↕'
                            }
                            else if (!generatedMaze.maze[k][j][i].walls.get('u')) {
                                cell.textContent = '↑'
                            }
                            else if (!generatedMaze.maze[k][j][i].walls.get('d')) {
                                cell.textContent = '↓'
                            }
                        }
                    }
                }
            }
            mazeHTML.appendChild(level);
        }        
        this.elem.appendChild(mazeHTML);
    }

    checkMove(nextMove) {

    }
};

export default MazeHTML;