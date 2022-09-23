class MazeDomain extends Searchable {
    constructor(startState, goalState, puzzle) {
        super(startState, goalState, puzzle)
    }

    getStateTransitions(currPosition) {
        // Get the maze.toStrings() for each of the 6 possible different neighbours.
        // Will need Maze3D object -> then the current cell object.
        // Iterate through all of the neighbours and print string of the possible moves.
        const [z, y, x] = currPosition;
        const directions = [[0, 0, -1, 'l'], [0, 0, 1, 'r'], [0, -1, 0, 'f'], [0, 1, 0, 'b'], [-1, 0, 0, 'd'], [1, 0, 0, 'u']];
        const transitions = [];
        
        for (const direction in directions) {
            let neighbour = [z + direction[0], y + direction[1], x + directions[2], directions[3]];
            if (neighbour[0] >= 0 && neighbour[0] < this.maze.levels && neighbour[1] >= 0 && neighbour[1] < this.maze.columns && neighbour[2] >= 0 && neighbour[2] < this.maze.rows) {
                transitions.push(maze.toString())
        }
        return transitions;
    }
};