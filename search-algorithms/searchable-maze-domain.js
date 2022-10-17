import Searchable from "./searchable.js";
import MazeState from "./maze-state.js";
import Node from "./node.js"

/**
 * @classdesc This class is an adapter for the maze domain which allows the 
 * domain agnostic solving algorithms to be utilized on a 3D maze.
 */
class MazeDomain extends Searchable {
    constructor(startState, goalState, puzzle) {
        super(puzzle);
        this.startState = new MazeState(startState);
        this.startNode = new Node(this.startState, 'root', 'root', 0)
        this.goalState = new MazeState(goalState);
        this.puzzle = puzzle;
        this.levels = puzzle.levels;
        this.columns = puzzle.columns;
        this.rows = puzzle.rows;
    }

    getStateTransitions(currNode) {

        const [z, y, x] = currNode;
        const directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'],
                            [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const transitions = [];
        
        for (const direction of directions) {
            let neighbour = [z + direction[0], y + direction[1], x + direction[2]];
            if (neighbour[0] >= 0 && neighbour[0] < this.levels && neighbour[1] >= 0 &&
                neighbour[1] < this.columns && neighbour[2] >= 0 && neighbour[2] < this.rows) {
                if (this.puzzle.maze[currNode[0]][currNode[1]][currNode[2]].walls.get(direction[3]) === false) {
                    transitions.push([new MazeState(neighbour), direction[3]]);
                }
            }
        }
        return transitions;
    }
};

export default MazeDomain;