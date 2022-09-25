import State from './state.js'
import Searchable from './searchable.js'
import Node from './node.js'

class BFS {
    constructor() {}

    /**
     * Depth first search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node} leafNode The node located at the goal cell.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        let startNode = new Node(new State(searchable.startState.toString()), 'root', 'root');
        stack.push(startNode);

        while (stack.length > 0) {
            let leafNode = stack.shift();
            if (leafNode.state === searchable.goalState.toString()) {
                return leafNode;
            }
            explored.add(leafNode.state.toString());

            // "transitions" will be an array of arrays.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(leafNode.state);
            let nodes = [];
            for (const transition of transitions) {
                if (explored.has(transition[0])) {
                    let idx = transitions.indexOf(transition);
                    transitions.splice(idx);
                }
                else {
                    nodes.push(new Node(transition[0], transition[1], leafNode));
                }
            }
            stack.push(nodes);
        }
    }
};

export default BFS;