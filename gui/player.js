class Player {
    constructor(startCell) {
        this.position = startCell;
    }

    move(direction) {
        // Check maze object to see if move is valid.
        // If not valid shake screen or play audio error noise.
        // Player avatar will use ABSOLUTE positioning within the level view
        // If move is valid update this.position & move player x/y number of pixels.
    }
};

export default Player;