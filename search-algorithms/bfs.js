import Node from './node.js'
import Searchable from './searchable.js'
import SearchAlgorithm from './search-algorithm.js'

/**
 * @classdesc This class implements the Breadth First Sarch (BFS) algorithm for
 * solving search problems. It exapnds the shallowest node first and utilizes a
 * FIFO queue for it's frontier.
 */
class BFS extends SearchAlgorithm {
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
        this.type = 'BFS';
    }

    /**
     * BFS solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node, Set} Returns an array containing the goalNode and the explored set.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        this.#numOfNodes = 1;
        stack.push(searchable.startNode);

        // Expand the frontier until no nodes left to be explored.
        while (stack.length > 0) {
            let currNode = stack.shift();
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

export default BFS;