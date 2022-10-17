import State from "./state.js";

/**
 * @classdesc Node object contains all the required information for evaluating
 * possible future moves to be made within a puzzle.
 */
class Node {
    /**
     * Node constructor.
     * @param {State} state String representing the state of the puzzle.
     * @param {String} action String representing the action taken to reach this state.
     * @param {Array} parent Array containing coordinates of the parent node.
     * @param {Number} cost Number representing heuristic function of the maze.
     */
    constructor(state, action, parent, cost) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.cost = cost;
    }
}

export default Node;