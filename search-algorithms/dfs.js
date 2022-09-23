import State from './state.js'
import Searchable from './searchable.js'

class DFS {
    constructor() {}
    /**
     * 
     * @param {Searchable} searchable Puzzle domain object
     * @returns 
     */
    search(searchable) {
        const explored = new Set();
        const stack = [];
        stack.push(searchable.initialState);

        while (stack.length > 0) {
            let leaf = stack.pop();
            if (leaf === searchable.goalState) {
                return leaf;
            }
            explored.add(leaf);
            let transitions = searchable.getStateTransitions();
            stack.push(transitions);
        }
    }
    // Initialize the frontier using intial state of the problem (getTransitionStates)
    // If frontier (LIFO stack) empty then return failure.
    // Choose leaf node and remove it from the frontier.
    // If the node contains a goal state then return solution.
    // Else add the node to the explored set.
    // Only choose new leaf if not in the frontier or explored set.


    actions() {
        // Generate all the possible child stat
    }
}