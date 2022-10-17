import DFSMaze3DGenerator from "../generator/dfs-maze-3d-generator.js";
import SimpleMaze3DGenerator from "../generator/simple-maze-3d-generator.js";
import AStar from "../search-algorithms/a-star.js";
import BFS from "../search-algorithms/bfs.js";
import DFS from "../search-algorithms/dfs.js";
import MazeDomain from "../search-algorithms/searchable-maze-domain.js";

/**
 * @classdesc This class produces a self-contained object for generating a 3D maze
 * along with its associated HTML GUI representation.
 */
class MazeHTML {
    static directions = new Map([
        ['ArrowRight', [[0, 0, 1], 'r']],
        ['ArrowLeft', [[0, 0, -1], 'l']],
        ['ArrowUp', [[0, -1, 0], 'f']],
        ['ArrowDown', [[0, 1, 0], 'b']],
        ['PageUp', [[1, 0, 0], 'u']],
        ['PageDown', [[-1, 0, 0], 'd']]
    ]);

    /**
     * 
     * @param {HTMLElement} elem HTML node which the entire maze GUI is appended to.
     * @param {Number} levels Number of levels to be in the maze.
     * @param {Number} cols Number of columns to be in the maze.
     * @param {Number} rows Number of rows to be in the maze.
     * @param {String} genAlgo String representing the type of maze generation algorithm.
     * @param {*} playerIcon Class description for a player icon. Link: https://icons8.com/line-awesome
     */
    constructor(elem, levels, cols, rows, genAlgo, playerIcon) {
        this.elem = elem;
        this.levels = levels;
        this.cols = cols;
        this.rows = rows;
        this.genAlgo = genAlgo;
        this.startCell = [];
        this.goalCell = [];
        this.icon = playerIcon
        this.maze = [];
        this.emFactor = 2;
        this.savedGames = new Map();
    }

    // This method generates the user selected type of maze and appends all levels,
    // rows and cells to their correct grid locations within the DOM. It also decorates
    // every cell border with the correct wall locations.
    createMaze(maze) {
        // Generate the maze based on the user input from the HTML form.
        if (this.genAlgo === 'dfs' && arguments.length === 0) {
            const dfsGen = new DFSMaze3DGenerator(this.levels, this.cols, this.rows);
            this.maze = dfsGen.generate();
            this.startCell = this.maze.startCell;
            this.goalCell = this.maze.goalCell;

        }
        else if (this.genAlgo === 'simple' && arguments.length === 0) {
            const simpleGen = new SimpleMaze3DGenerator(this.levels, this.cols, this.rows);
            this.maze = simpleGen.generate();
            this.startCell = this.maze.startCell;
            this.goalCell = this.maze.goalCell;
        }
        else if (maze) {

        }

        // Construct the html elements of the maze for each level.
        const mazeHTML = document.createElement('div');

        // Create a title to display the current level.
        const currLevelTitle = document.createElement('h2');
        currLevelTitle.id = 'currLevelTitle';
        currLevelTitle.textContent = 'Level ' + String(this.maze.startCell[0]);
        currLevelTitle.style.color = 'cyan';
        mazeHTML.appendChild(currLevelTitle);

        // Create a container for the current maze level. Player will move
        // relative to this container element.
        const gridContainer = document.createElement('div');
        gridContainer.id = 'gridContainer';
        gridContainer.style.display = 'flex';
        gridContainer.style.flexDirection = 'column';
        gridContainer.style.height =
            gridContainer.style.position = 'relative';
        mazeHTML.appendChild(gridContainer);

        // Constructing a new div for every level in the maze.
        for (let k = 0; k < this.levels; k++) {

            // Create levels and assign inactive class if not the starting level.
            const level = document.createElement('div');
            level.className = 'activeLevel';
            level.id = 'Level' + String(k);
            level.style.display = 'flex';
            level.style.flexDirection = 'column';
            level.style.position = 'relative';
            if (k !== this.maze.startCell[0]) {
                level.className = 'hiddenLevel';
                level.style.display = 'none';
            }
            for (let j = 0; j < this.rows; j++) {
                const row = document.createElement('div');
                row.className = 'row';
                row.style.display = 'flex';
                level.appendChild(row);
                for (let i = 0; i < this.cols; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    row.appendChild(cell);
                    const directions = ['r', 'l', 'f', 'b', 'u', 'd'];

                    // Check for start and goal cells.
                    if (this.maze.maze[k][j][i].checkStatus('s')) {
                        cell.textContent = 'S';
                    }
                    else if (this.maze.maze[k][j][i].checkStatus('g')) {
                        cell.textContent = 'G';
                    }

                    // Decorate each cell with correct border walls and arrows.
                    for (const direction of directions) {
                        if (this.maze.maze[k][j][i].walls.get(direction)) {
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
                            else if (!this.maze.maze[k][j][i].walls.get('u') && !this.maze.maze[k][j][i].walls.get('d')) {      // Why arent you working!KJG!J!YF
                                cell.textContent += '*';
                                cell.style.color = 'blue';
                            }
                            else if (!this.maze.maze[k][j][i].walls.get('u')) {
                                cell.textContent += '↑';
                                cell.style.color = 'green';
                            }
                            else if (!this.maze.maze[k][j][i].walls.get('d')) {
                                cell.textContent += '↓';
                                cell.style.color = 'red';
                            }
                        }
                    }
                }
            }
            gridContainer.appendChild(level);
        }
        this.elem.appendChild(mazeHTML);
        this._initializePlayer();
    }

    // This method creates the HTML icon element for the player and places it on
    // the starting cell.
    _initializePlayer() {
        // Initialize the player icon element.
        const player = document.createElement('i');
        player.className = this.icon;
        player.id = 'player';
        player.style.color = 'white';
        player.style.position = 'absolute';

        // Position the player in the correct starting location. 2 is the number
        // of em units used per cell - this is why currX and currY are multiplied by 2.
        const currX = 2 * this.startCell[2] + 0.5;
        player.style.left = currX + 'em';
        const currY = 2 * this.startCell[1] + 0.5;
        player.style.top = currY + 'em';
        const grid = document.getElementById('gridContainer');
        grid.appendChild(player);
        this.runMaze();
    }

    // This method contains the directional pad event listener for handling user
    // move requests.
    runMaze() {
        const player = document.getElementById('player');
        const gridContainer = document.getElementById('gridContainer');     // Why does my code still work when this isn't here?
        let currCell = this.startCell;
        let emFactor = 2;

        // DIRECTIONAL PAD LISTENER // 
        document.addEventListener('keydown', e => {
            const currLevel = document.getElementsByClassName('activeLevel')[0];
            let dirArray = MazeHTML.directions.get(e.key)[0];
            let dirLetter = MazeHTML.directions.get(e.key)[1];

            if (e.key.includes('Arrow') && !this.checkMove(currCell, dirLetter, dirArray)) {
                currCell = this.moveCell(player, currCell, dirArray, e);
            }

            else if ((e.key === 'PageUp' && currCell[0] >= 0 && currCell[0] < this.levels - 1 && !this.checkMove(currCell, dirLetter, dirArray)) ||
                (e.key === 'PageDown' && currCell[0] > 0 && currCell[0] < this.levels && !this.checkMove(currCell, dirLetter, dirArray))) {
                currCell = this.changeLevel(currCell, currLevel, e);
            }
        });

        // SOLVE GAME BUTTON LISTENER //
        const solveBtn = document.getElementById('solve-game');

        solveBtn.addEventListener('click', () => {
            let solvedPath = this.solveMaze(currCell);
            console.log(solvedPath);
            // player.style.transition = 'left';
            // player.style.transitionDelay = '1s';
            // player.style.transitionTimingFunction = 'ease'
            // player.style.transition = 'top';
            // player.style.transitionDelay = '1s';
            let i = solvedPath.length - 1;
            const timer = setInterval(() => {
                if (solvedPath[i][0] === solvedPath[i - 1][0]) {
                    const newX = (solvedPath[i][2] * 2 + 0.5);
                    const newY = (solvedPath[i][1] * 2 + 0.5);
                    player.style.left = newX + 'em';
                    player.style.top = newY + 'em';
                }
                else if (solvedPath[i][0] - solvedPath[i - 1][0] > 0) {
                    const currLevel = document.getElementsByClassName('activeLevel')[0];
                    currLevel.className = 'hiddenLevel';
                    currLevel.style.display = 'none';
                    let nextLevelID = 'Level' + Number(solvedPath[i - 1][0]);
                    let nextLevel = document.getElementById(nextLevelID);
                    nextLevel.className = 'activeLevel';
                    nextLevel.style.display = 'flex';
                    let levelTitle = document.getElementById('currLevelTitle');
                    levelTitle.textContent = 'Level ' + (currCell[0]);
                }
                else if (solvedPath[i][0] - solvedPath[i - 1][0] < 0) {
                    const currLevel = document.getElementsByClassName('activeLevel')[0];
                    currLevel.className = 'hiddenLevel';
                    currLevel.style.display = 'none';
                    let nextLevelID = 'Level' + Number(solvedPath[i][0]);
                    let nextLevel = document.getElementById(nextLevelID);
                    nextLevel.className = 'activeLevel';
                    nextLevel.style.display = 'flex';
                    let levelTitle = document.getElementById('currLevelTitle');
                    levelTitle.textContent = 'Level ' + (currCell[0]);
                }
                i--;
                if (i < 0) {
                    clearInterval(timer);
                }
            }, 500);
        });

        // RESET GAME BUTTON LISTENER //
        const resetBtn = document.getElementById('reset-game');
        resetBtn.addEventListener('click', () => {
            player.remove();
            this._initializePlayer();
        });

        // SHOW HINT BUTTON LISTENER //
        // TODO: Multilevel mazes are flashing multiple cells green.
        const showHintBtn = document.getElementById('show-hint');
        showHintBtn.addEventListener('click', () => {
            let solvedPath = this.solveMaze(currCell);
            // console.log(solvedPath);
            let hint = this.solveMaze(currCell).splice(-1);
            let currLevel = document.getElementsByClassName('activeLevel')[0];
            let currRow = currLevel.children.item(hint[0][1]);
            let hintCell = currRow.children.item(hint[0][2]);
            hintCell.style.backgroundColor = 'yellow';
            const flashHint = setTimeout(() => {
                hintCell.style.backgroundColor = 'transparent';
            }, 1000);
        });

        // SAVE GAME BUTTON LISTENER //
        const saveGameBtn = document.getElementById('save-game');
        saveGameBtn.addEventListener('click', () => {
            saveGameBtn()

        });
    }

    saveGame() {
        const nameInput = document.getElementById('maze-name');

    }

    loadGame(name) {
        if (!this.savedGames.get(nameInput)) {
            alert('No game saved with that name.')
        }
    }

    solveMaze(currCell) {
        const algos = new Map([
            ['a-star', new AStar()],
            ['bfs', new BFS()],
            ['dfs', new DFS()]
        ]);

        let searchAlgoInput = document.getElementById('search-algo');
        let searchAlgo = algos.get(searchAlgoInput.value);
        let searchable = new MazeDomain(currCell, this.goalCell, this.maze);
        let goalNode = searchAlgo.search(searchable);
        const path = [];

        while (goalNode.parent !== 'root') {
            path.push(goalNode.state.key);
            goalNode = goalNode.parent;
        }
        return path;
    }

    moveCell(player, currCell, dirArray, e) {
        e.preventDefault();
        let currX = Number(player.style.left.slice(0, -2));
        let currY = Number(player.style.top.slice(0, -2));
        let newX = (currX + (dirArray[2] * this.emFactor));
        let newY = (currY + (dirArray[1] * this.emFactor));
        currCell = [currCell[0], currCell[1] + dirArray[1],
        currCell[2] + dirArray[2]];
        player.style.left = newX + 'em';
        player.style.top = newY + 'em';
        return currCell;
    }

    changeLevel(currCell, currLevel, e) {
        e.preventDefault();
        currLevel.className = 'hiddenLevel';
        currLevel.style.display = 'none';
        const nextLevelID = 'Level' + (currCell[0] + MazeHTML.directions.get(e.key)[0][0]);
        let nextLevel = document.getElementById(nextLevelID);
        nextLevel.className = 'activeLevel';
        nextLevel.style.display = 'flex';
        currCell = [currCell[0] + MazeHTML.directions.get(e.key)[0][0], currCell[1], currCell[2]];
        let levelTitle = document.getElementById('currLevelTitle');
        levelTitle.textContent = 'Level ' + (currCell[0]);
        return currCell;
    }

    // Method will check if the next move is goal cell, if not will return the boolean value of the 
    // wall en route to the next cell. 'false' if there is no wall, 'true' if there is a wall.
    checkMove(currCell, dirLetter, dirArray) {
        if (!this.maze.maze[currCell[0]][currCell[1]][currCell[2]].walls.get(dirLetter)) {
            let checkCell = [currCell[0] + dirArray[0], currCell[1] + dirArray[1], currCell[2] + dirArray[2]];
            if (checkCell.toString() === this.goalCell.toString()) {
                this.elem.textContent = 'YOU SOLVED THE MAZE WAY TO GO!!!';
                this.elem.style.justifyContent = 'center';
                this.elem.style.alignItems = 'center';
                this.elem.style.color = 'cyan';
            }
            else {
                return this.maze.maze[currCell[0]][currCell[1]][currCell[2]].walls.get(dirLetter);
            }
        }
        else {
            return true;
        }
    }
};

export default MazeHTML;