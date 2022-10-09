import State from "./state.js";

/**
 * @classdesc This class stores the state of the maze while evaluating future
 * moves to be made. These states are later included within the
 * the Node object.
 */
class MazeState extends State {
    #key
    /**
     * State object for the maze.
     * @param {Array} key Coordinates of the current location.
     */
    constructor(key) {
        super(key);
        this.#key = key;
    }
    get key() {
        return this.#key;
    }
    equals(other) {
        return other instanceof MazeState && this.#key === other.#key;
    }
};

export default MazeState;