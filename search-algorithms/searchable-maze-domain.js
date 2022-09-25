import Searchable from "./searchable.js";
import MazeState from "./maze-state.js";
import Node from "./node.js"

class MazeDomain extends Searchable {
    constructor(startState, goalState, puzzle) {
        super(puzzle);
        this.startNode = new Node(new MazeState(startState), 'root', 'root');
        this.goalState = new MazeState(goalState.toString());
        this.puzzle = puzzle;
    }

    getStateTransitions(currNode) {

        const [z, y, x] = currNode;
        const directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'], [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const transitions = [];
        
        for (const direction of directions) {
            let neighbour = [z + direction[0], y + direction[1], x + direction[2]];
            if (neighbour[0] >= 0 && neighbour[0] < this.puzzle.levels && 
                neighbour[1] >= 0 && neighbour[1] < this.puzzle.columns && 
                neighbour[2] >= 0 && neighbour[2] < this.puzzle.rows) {
                if (this.puzzle.maze[currNode[0]][currNode[1]][currNode[2]].walls.get(direction[3]) === false) {
                    transitions.push([new MazeState(neighbour), direction[3]]);
                }
            }
        }
        return transitions;
    }
};

export default MazeDomain;