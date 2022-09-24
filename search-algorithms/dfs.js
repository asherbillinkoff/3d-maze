import State from './state.js'
import Searchable from './searchable.js'
import Node from './node.js'

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
        let startNode = new Node(new State(searchable.startState.toString()), 'root', 'root');
        stack.push(startNode);

        while (stack.length > 0) {
            let leafNode = stack.pop();
            if (leafNode === searchable.goalState.toString()) {
                return leafNode;
            }
            explored.add(leafNode.state.toString());
            let transitions = searchable.getStateTransitions(leafNode); //This should be a list of 
            let nodes = [];
            for (const transition of transitions) {
                if (explored.has(transition)) {
                    let idx = transitions.indexOf(transition);
                    transitions.splice(idx);
                }
                else {
                    nodes.push(new Node())
                }
            }
            stack.push(nodes);
        }
    }
};

export default DFS