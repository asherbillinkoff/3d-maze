import Node from './node.js'
import Searchable from './searchable.js'
import SearchAlgorithm from './search-algorithm.js'

class BFS extends SearchAlgorithm {
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
    }

    /**
     * Breadth first search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node} leafNode The node located at the goal cell.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        this.#numOfNodes = 1;
        stack.push(searchable.startNode);

        while (stack.length > 0) {
            let leafNode = stack.shift();
            this.#numOfNodes += 1;
            if (leafNode.state.key.toString() === searchable.goalState.key.toString()) {
                return leafNode;
            }
            explored.add(leafNode.state.key.toString());

            // "transitions" will be an array of arrays.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(leafNode.state.key);
            for (const transition of transitions) {
                if (!explored.has(transition[0].key.toString())) {
                    stack.push(new Node(transition[0], transition[1], leafNode));
                }
            }
        }
    }

    getNumberOfNodes() {
        return this.#numOfNodes;
    }
};

export default BFS;