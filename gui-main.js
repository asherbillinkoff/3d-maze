import MazeHTML from "./gui/maze-html.js";

function startingSequence() {
    // Retrieve all of the maze information from the user input.
    const rowInput = document.getElementById('rows');
    const rows = rowInput.valueAsNumber;
    const colInput = document.getElementById('cols');
    const cols = colInput.valueAsNumber;
    const lvlInput = document.getElementById('levels');
    const lvls = lvlInput.valueAsNumber;
    const genAlgoInput = document.getElementById('gen-algo');
    const genAlgo = genAlgoInput.value;
    const mazeContainer = document.getElementById('maze-container');

    // Clear the maze contents in case maze already exists.
    mazeContainer.textContent = '';

    // Initiate the player icon and location. Icons imported from here: https://icons8.com/line-awesome
    const playerIcon = "las la-motorcycle";
    const player = document.createElement('i');
    player.className = playerIcon;
    player.id = 'avatar';
    player.style.color = 'white';
    player.style.position = 'absolute';

    // Initiate the maze HTML object.
    const mazeHTML = new MazeHTML(mazeContainer, lvls, cols, rows, genAlgo, playerIcon);
    mazeHTML.createMaze();

    // Position the player in the correct starting location.
    const leftOffset = 2 * mazeHTML.startCell[2];
    player.style.left = String(leftOffset) + 'em';
    const topOffset = 2 * mazeHTML.startCell[1];
    player.style.top = String(topOffset) + 'em';
    const level1 = document.getElementById('Level1');
    level1.appendChild(player);
}

const startBtn = document.getElementById('start-game');
startBtn.addEventListener('mouseup', e => {
    if (e.button === 0) {
        startingSequence();
    }
});

startBtn.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        startingSequence();
    }
});


