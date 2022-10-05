import Node from "./node.js";
import PriorityQueue from "./priority-queue.js";
import Searchable from "./searchable.js";
import SearchAlgorithm from "./search-algorithm.js";


class AStar extends SearchAlgorithm{
    #numOfNodes
    constructor() {
        super();
        this.#numOfNodes = 0;
        this.type = 'A-Star';
    }

    /**
     * A-Star search solver class.
     * @param {Searchable} searchable Domain specific puzzle object.
     * @returns {Node, Set} Returns an array containing the goalNode and the explored set.
     */
    search(searchable) {
        // Initiate required structures and compute heuristic for the start node.
        const explored = new Set();
        const frontier = new PriorityQueue();
        this.#numOfNodes = 1;
        let startCost = this._computeCost(searchable.startState.key, searchable.startState.key, searchable.goalState.key);
        searchable.startNode.cost = startCost;
        frontier.push(searchable.startNode);
        let goalNode;

        while (frontier.size() > 0) {
            let currNode = frontier.pop()[1];
            explored.add(currNode.state.key.toString());
            this.#numOfNodes += 1;
            if (currNode.state.key.toString() === searchable.goalState.key.toString()) {
                goalNode = currNode;
            }

            // "transitions" will be an array of valid moves.
            // Each inner array (i.e. individual transition) will contain [state, action].
            let transitions = searchable.getStateTransitions(currNode.state.key);
            for (const transition of transitions) {
                if (!explored.has(transition[0].key.toString())) {
                    let currNodeCost = this._computeCost(searchable.startState.key, transition[0].key, searchable.goalState.key);
                    frontier.push(new Node(transition[0], transition[1], currNode, currNodeCost));
                }
            }
        }
        return [goalNode, explored];
    }

    _computeCost(startPosition, currPosition, goalPosition) {
        const [zs, ys, xs] = startPosition;
        const [zc, yc, xc] = currPosition;
        const [zg, yg, xg] = goalPosition;
        let gs = Math.abs(zs - zc) + Math.abs(ys - yc) + Math.abs(xs - xc);
        let hs = Math.abs(zg - zc) + Math.abs(yg - yc) + Math.abs(xg - xc);
        let result = gs + hs;
        return result;
    }
    
    getNumberOfNodes() {
        return this.#numOfNodes;
    }
};

export default AStar;