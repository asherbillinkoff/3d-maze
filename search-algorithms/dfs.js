import Node from './node.js'
import Searchable from './searchable.js'
import SearchAlgorithm from './search-algorithm.js';

/**
 * @classdesc This class implements the Depth First Sarch (DFS) algorithm for
 * solving search problems. It exapnds the deepest node first and utilizes a
 * LIFO queue (stack) for it's frontier.
 */
class DFS extends SearchAlgorithm {
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
    }

    /**
     * DFS solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node, Set} Returns an array containing the goal Node object.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        this.#numOfNodes = 1;
        stack.push(searchable.startNode);
        this.type = 'DFS';

        // Expand the frontier until no nodes left to be explored.
        while (stack.length > 0) {
            let currNode = stack.pop();
            this.#numOfNodes += 1;
            if (currNode.state.key.toString() === searchable.goalState.key.toString()) {
                return currNode;
            }
            explored.add(currNode.state.key.toString());

            // "transitions" will be an array of arrays.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(currNode.state.key);
            for (const transition of transitions) {
                if (!explored.has(transition[0].key.toString())) {
                    stack.push(new Node(transition[0], transition[1], currNode));
                }
            }
        }
    }

    // This method returns the variable which contains the number of nodes
    // visited throughout the solving algorithm.
    getNumberOfNodes() {
        return this.#numOfNodes;
    }
};

export default DFS;