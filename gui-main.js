import MazeHTML from "./gui/maze-html.js";

const mazeContainer = document.getElementById('maze-container');

// TODO: Maybe there's some way to automate this?
// Start Game button listener.
const startBtn = document.getElementById('start-game');
startBtn.addEventListener('click', () => {
    startingSequence();
});

// This function retrieves all of the user input about the maze from the HTML form,
// initializes the player icon and MazeHTML object. Called when "Start Game" clicked.
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

    // Clear the maze contents in case maze has already been played.
    mazeContainer.textContent = '';

    // Initiate the player icon. Icons imported from here: https://icons8.com/line-awesome
    const playerIcon = "las la-motorcycle";

    // Initiate the mazeHTML object.
    const mazeHTML = new MazeHTML(mazeContainer, lvls, cols, rows, genAlgo, playerIcon);
    mazeHTML.createMaze();
    mazeHTML.maze.toString();
};
