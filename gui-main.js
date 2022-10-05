import MazeHTML from "./gui/maze-html.js";
import Player from "./gui/player.js";


const startBtn = document.getElementById('start-game');
startBtn.addEventListener('mouseup', e => {
    if (e.button === 0) {
        const rowInput = document.getElementById('rows');
        const rows = rowInput.valueAsNumber;
        const colInput = document.getElementById('cols');
        const cols = colInput.valueAsNumber;
        const lvlInput = document.getElementById('levels');
        const lvls = lvlInput.valueAsNumber;
        const genAlgoInput = document.getElementById('gen-algo');
        const genAlgo = genAlgoInput.value;
        const mazeContainer = document.getElementById('maze-container');
        mazeContainer.textContent = '';
        const mazeHTML = new MazeHTML(mazeContainer, lvls, cols, rows, genAlgo);
        mazeHTML.createMaze();
        console.log('button clicked');
        const player = document.createElement()
    }
});

startBtn.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        const rowInput = document.getElementById('rows');
        const rows = rowInput.valueAsNumber;
        const colInput = document.getElementById('cols');
        const cols = colInput.valueAsNumber;
        const lvlInput = document.getElementById('levels');
        const lvls = lvlInput.valueAsNumber;
        const genAlgoInput = document.getElementById('gen-algo');
        const genAlgo = genAlgoInput.value;
        const mazeContainer = document.getElementById('maze-container');
        mazeContainer.textContent = '';
        const mazeHTML = new MazeHTML(mazeContainer, lvls, cols, rows, genAlgo);
        mazeHTML.createMaze();
        console.log('button clicked');
        const player = new Player(mazeHTML.startCell);
    }
});

const player = new Player(mazeHTML.startCell);
player.move(direction)
