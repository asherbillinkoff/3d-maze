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
     * Maze HTML constructor.
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
    createMaze(savedMaze) {
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

        // Construct the html elements of the maze for each level.
        const mazeHTML = document.createElement('div');

        // Create a title to display the current level.
        const currLevelTitle = document.createElement('h2');
        currLevelTitle.id = 'currLevelTitle';
        currLevelTitle.textContent = 'Level ' + String(this.startCell[0]);
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
            if (k !== this.startCell[0]) {
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
                            else if (!this.maze.maze[k][j][i].walls.get('u')) {
                                cell.textContent += '↑';
                                cell.style.color = 'green';
                            }
                            else if (!this.maze.maze[k][j][i].walls.get('d')) {
                                cell.textContent += '↓';
                                cell.style.color = 'red';
                            }
                        }
                        // Separate if statement for finding the double arrowed cells.
                        else if (!this.maze.maze[k][j][i].walls.get('u') && !this.maze.maze[k][j][i].walls.get('d')) {
                            if (cell.textContent === '') {
                                cell.textContent += '↕';
                                cell.style.color = 'blue';
                            }
                        }
                    }
                }
            }
            gridContainer.appendChild(level);
        }
        this.elem.appendChild(mazeHTML);
        this.initializePlayer(this.startCell);
    }

    // This method creates the HTML icon element for the player and places it on
    // the starting cell.
    initializePlayer(location) {

        // Initialize the player icon element if no player exists.
        if (document.getElementById('player')) {
            const player = document.getElementById('player').remove();
        }
        const player = document.createElement('i');
        player.className = this.icon;
        player.id = 'player';
        player.style.color = 'white';
        player.style.position = 'absolute';

        // Position the player in the correct starting location. 2 is the number
        // of em units used per cell - this is why currX and currY are multiplied by 2.
        const currX = 2 * location[2] + 0.5;
        player.style.left = currX + 'em';
        const currY = 2 * location[1] + 0.5;
        player.style.top = currY + 'em';
        const grid = document.getElementById('gridContainer');
        grid.appendChild(player);
        this.runMaze();
    }

    // This method contains all event listeners required for running the game.
    // This includes directional pad, reset game, show hint, save game and solve game.
    runMaze() {
        const player = document.getElementById('player');
        const gridContainer = document.getElementById('gridContainer');     // Why does my code still work when this isn't here?
        let currCell = this.startCell;
        let currLevel = document.getElementsByClassName('activeLevel')[0];

        // DIRECTIONAL PAD LISTENER // 
        document.addEventListener('keydown', e => {
            let dirArray = MazeHTML.directions.get(e.key)[0];
            let dirLetter = MazeHTML.directions.get(e.key)[1];

            if (e.key.includes('Arrow') && !this.checkMove(currCell, dirLetter, dirArray)) {
                currCell = this.moveCell(player, currCell, dirArray, e);
            }

            else if ((e.key === 'PageUp' && currCell[0] >= 0 && currCell[0] < this.levels - 1 && !this.checkMove(currCell, dirLetter, dirArray)) ||
                (e.key === 'PageDown' && currCell[0] > 0 && currCell[0] < this.levels && !this.checkMove(currCell, dirLetter, dirArray))) {
                [currCell, currLevel] = this.changeLevel(currCell, currLevel, e);
            }
            else { }
        });

        // SOLVE GAME BUTTON LISTENER //
        const solveBtn = document.getElementById('solve-game');

        solveBtn.addEventListener('click', () => {
            let solvedPath = this.solveMaze(currCell);
            console.log(solvedPath);
            let i = solvedPath.length - 1;
            const timer = setInterval(() => {

                // If the next move on the path is on the same level then
                // the function won't need to change the active level.
                if (solvedPath[i][0] === solvedPath[i - 1][0]) {
                    const newX = (solvedPath[i][2] * 2 + 0.5);
                    const newY = (solvedPath[i][1] * 2 + 0.5);
                    player.style.left = newX + 'em';
                    player.style.top = newY + 'em';
                }

                // If the next move is on the lower level then the display will have
                // to be adjusted.
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

                // If the next move is on the level above then the display will have
                // to be adjusted.
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
        resetBtn.addEventListener('click', e => {
            this.initializePlayer(this.startCell);
            [currCell, currLevel] = this.changeLevel(currCell, currLevel);
        });

        // SHOW HINT BUTTON LISTENER //
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
        const mazeName = document.getElementById('maze-name');
        const saveGameBtn = document.getElementById('save-game');
        saveGameBtn.addEventListener('click', () => {
            this.saveGame(mazeName.value);
        });

        // LOAD GAME BUTTON LISTENER //
        const loadGameBtn = document.getElementById('load-game');
        loadGameBtn.addEventListener('click', () => {
            const mazeContainer = document.getElementById('maze-container');
            mazeContainer.textContent = '';
            this.loadGame(mazeName.value);
            // Cannot get this method working properly. The listener continues
            // to execute on an infinite loop for some reason?
        });
    }

    // Method will check if the next move is the goal cell, if not will return the boolean value of the 
    // wall en route to the next cell. Returns 'false' if there is no wall, 'true' if there is a wall.
    checkMove(currCell, dirLetter, dirArray) {
        if (!this.maze.maze[currCell[0]][currCell[1]][currCell[2]].walls.get(dirLetter)) {
            let checkCell = [currCell[0] + dirArray[0], currCell[1] + dirArray[1], currCell[2] + dirArray[2]];
            if (checkCell.toString() === this.goalCell.toString()) {
                this.elem.textContent = '';
                const winMsg = document.createElement('p');
                winMsg.textContent = 'YOU WON!';
                this.elem.style.display = 'flexbox';
                this.elem.style.flexDirection = 'column';
                this.elem.style.maxWidth = '75em';
                this.elem.style.justifyContent = 'center';
                this.elem.style.textAlign = 'center';
                this.elem.style.color = 'cyan';
                const success = document.createElement('img');
                success.src = './images/giphy.gif';
                success.style.maxWidth = '200px';
                this.elem.appendChild(winMsg);
                this.elem.appendChild(success);
            }
            else {
                return this.maze.maze[currCell[0]][currCell[1]][currCell[2]].walls.get(dirLetter);
            }
        }
        else {
            return true;
        }
    }

    // Method is responsible for moving the player only on the 2D plane. This is
    // only when a move is made within the same level of the maze.
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

    // Method is responsible for moving the player between 3D levels (up and down).
    // Takes care of hiding and activating the appropriate levels.
    changeLevel(currCell, currLevel, e) {
        if (e.key === "PageUp") {
            e.preventDefault();
            currLevel.className = 'hiddenLevel';
            currLevel.style.display = 'none';
            let nextLevelID = 'Level' + (currCell[0] + 1);
            let nextLevel = document.getElementById(nextLevelID);
            nextLevel.className = 'activeLevel';
            nextLevel.style.display = 'flex';
            currCell = [currCell[0] + 1, currCell[1], currCell[2]];
            let levelTitle = document.getElementById('currLevelTitle');
            levelTitle.textContent = 'Level ' + (currCell[0]);
            return [currCell, nextLevel];
        }
        else if (e.key === "PageDown") {
            e.preventDefault();
            currLevel.className = 'hiddenLevel';
            currLevel.style.display = 'none';
            let nextLevelID = 'Level' + (currCell[0] - 1);
            let nextLevel = document.getElementById(nextLevelID);
            nextLevel.className = 'activeLevel';
            nextLevel.style.display = 'flex';
            currCell = [currCell[0] - 1, currCell[1], currCell[2]];
            let levelTitle = document.getElementById('currLevelTitle');
            levelTitle.textContent = 'Level ' + (currCell[0]);
            return [currCell, nextLevel];
        }
        // Intended for use by the 'Reset Game' button.
        else {
            currLevel.className = 'hiddenLevel';
            currLevel.style.display = 'none';
            let nextLevelID = 'Level' + this.startCell[0];
            let nextLevel = document.getElementById(nextLevelID);
            nextLevel.className = 'activeLevel';
            nextLevel.style.display = 'flex';
            currCell = [this.startCell[0], this.startCell[1], this.startCell[2]];
            let levelTitle = document.getElementById('currLevelTitle');
            levelTitle.textContent = 'Level ' + (currCell[0]);
            return [currCell, nextLevel];
        }
    }

    // This method utilizes the solving algorithms to find the fastest path from
    // goal cell back to current location. That path is then returned to the game
    // to animate the solution to the goal cell.
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
        console.log(path);
        return path;
    }

    saveGame(mazeName) {
        // Save all required constructor attributes.
        const savedMaze = this.maze;
        const savedLevels = this.levels;
        const savedCols = this.cols;
        const savedRows = this.rows;
        const savedStart = this.startCell;
        const savedGoal = this.goalCell;
        const savedGame = [savedMaze, savedLevels, savedCols, savedRows, savedStart, savedGoal];
        this.savedGames.set(mazeName, savedGame);
        alert(`${mazeName} has been saved successfully.`);
    }

    loadGame(mazeName) {
        if (!this.savedGames.get(mazeName)) {
            alert('No game saved with that name.')
        }
        const loadedGame = this.savedGames.get(mazeName);
        this.maze = loadedGame[0];
        this.levels = loadedGame[1];
        this.cols = loadedGame[2];
        this.rows = loadedGame[3];
        this.startCell = loadedGame[4];
        this.goalCell = loadedGame[5];
        this.createMaze(this.maze);
        alert(`${mazeName} has been loaded successfully.`);
    }
};

export default MazeHTML;