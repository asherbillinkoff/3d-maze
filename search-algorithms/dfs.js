import Node from './node.js'
import Searchable from './searchable.js'
import SearchAlgorithm from './search-algorithm.js';

class DFS extends SearchAlgorithm {
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
    }

    /**
     * Depth first search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node, Set} Returns an array containing the goalNode and the explored set.
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        this.#numOfNodes = 1;
        stack.push(searchable.startNode);
        this.type = 'DFS';
        let goalNode;

        while (stack.length > 0) {
            let currNode = stack.pop();
            this.#numOfNodes += 1;
            if (currNode.state.key.toString() === searchable.goalState.key.toString()) {
                goalNode = currNode;
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
        return [goalNode, explored];
    }

    getNumberOfNodes() {
        return this.#numOfNodes;
    }
};

export default DFS;