import Searchable from './searchable.js'
import Node from './node.js'

class DFS {
    constructor() {}

    /**
     * Depth first search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node} leafNode The node located at the goal cell.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        let numOfNodes = 1;
        stack.push(searchable.startNode);

        while (stack.length > 0) {
            let leafNode = stack.pop();
            numOfNodes += 1;
            if (leafNode.state.key.toString() === searchable.goalState.key.toString()) {
            //if (leafNode.state.equals(searchable.goalState)) {
                return [leafNode, numOfNodes];
            }
            explored.add(leafNode.state.key.toString());

            // "transitions" will be an array of arrays.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(leafNode.state.key);
            for (const transition of transitions) {
                if (explored.has(transition[0].key.toString())) {
                    let idx = transitions.indexOf(transition);
                    transitions.splice(idx);
                }
                else {
                    stack.push(new Node(transition[0], transition[1], leafNode));
                }
            }
        }
    }
    // getNumberOfNodes() {
    //     return this.#numOfNodes;
    // }
};

export default DFS;