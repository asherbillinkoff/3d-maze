import Node from "./node.js";
import PriorityQueue from "./priority-queue.js";
import Searchable from "./searchable.js";
import SearchAlgorithm from "./search-algorithm.js";


class AStar extends SearchAlgorithm{
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
    }

    /**
     * A-Star search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node} leafNode The node located at the goal cell.
     */
    search(searchable) {
        const explored = new Set();
        const frontier = new Map(); // Keys = cost, Values = coordinates
        this.#numOfNodes = 1;
        startCost = _computeCost(searchable.startState, searchable.startState, searchable.goalState);
        frontier.push(startCost);

        while (frontier.size > 0) {
            let lowestCostKey = _findNextKey(frontier);
            currNode = frontier.get(lowestCostKey)[0];
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

    _computeCost(startPosition, currPosition, goalPosition) {
        const [zs, ys, xs] = startPosition;
        const [zc, yc, xc] = currPosition;
        const [zg, yg, xg] = goalPosition;
        let gs = Math.abs(zs - zc) + Math.abs(ys - yc) + (xs - xc);
        let hs = Math.abs(zg - zc) + Math.abs(yg - yc) + (xg - xc);
        let result = gs + hs;
        return result;
    }

    _findNextKey(frontier) {
        const [lowestCostKey] = Object.entries(frontier).reduce(([v1, ], [v2, ]) => v1 - v2);
        return lowestCostKey;
    }
    
    getNumberOfNodes() {
        return this.#numOfNodes;
    }
};

export default AStar;