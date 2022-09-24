class Node {
    /**
     * 
     * @param {String} state String representing the state of the puzzle.
     * @param {Array} parent Array containing coordinates of the parent node.
     * @param {String} action String representing the action taken to reach this state.
     */
    constructor(state, parent, action) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }
}

export default Node;