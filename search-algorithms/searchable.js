class Searchable {
    constructor(startState, goalState, puzzle) {
        if (this.constructor === Searchable) {
            throw new Error('Cannot instantiate the abstract class Searchable');
        }
        this.startState = startState;
        this.goalState = goalState;
        this.puzzle = puzzle;
    }

    getStateTransitions(currPosition) {}
}