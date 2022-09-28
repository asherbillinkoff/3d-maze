import State from "./state.js";

class Node {
    /**
     * Node constructor.
     * @param {State} state String representing the state of the puzzle.
     * @param {String} action String representing the action taken to reach this state.
     * @param {Array} parent Array containing coordinates of the parent node.
     */
    constructor(state, action, parent, cost) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.cost = cost;
    }
}

export default Node;