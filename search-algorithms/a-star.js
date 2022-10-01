import Node from "./node.js";
import PriorityQueue from "./priority-queue.js";
import Searchable from "./searchable.js";
import SearchAlgorithm from "./search-algorithm.js";
import MazeState from "./maze-state.js";


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
        // Initiate required structures and compute heuristic for the start node.
        const explored = new Set();
        const frontier = new PriorityQueue();
        this.#numOfNodes = 1;
        startCost = _computeCost(searchable.startState, searchable.startState, searchable.goalState);
        const startNode = new Node(new MazeState(searchable.startState), 'root', 'root', startCost)
        frontier.push(startNode);

        while (frontier.size > 0) {
            let currNode = frontier.pop();
            explored.add(currNode.state.toString());
            this.#numOfNodes += 1;
            if (currNode.state.key.toString() === searchable.goalState.key.toString()) {
                return currNode;
            }

            // "transitions" will be an array of valid moves.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(currNode.state.key);
            for (const transition of transitions) {
                if (!explored.has(transition[0].key.toString())) {
                    //let currNodeCost = this._computeCost(searchable.startState, transition[0].key, searchable.goalState);
                    //frontier.push(new Node(transition[0], transition[1], leafNode, currNodeCost));
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