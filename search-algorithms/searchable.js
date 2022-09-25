/**
 * @classdesc Abstract class of puzzle domain to be solved.
 */
class Searchable {
    /**
     * Puzzle domain constructor
     * @param {Array} startState Contains coordinates of the start location.
     * @param {Array} goalState Contains coordinates of the goal location.
     * @param {*} puzzle Contains the puzzle to be solved.
     */
    constructor(startState, goalState, puzzle) {
        if (this.constructor === Searchable) {
            throw new Error('Cannot instantiate the abstract class Searchable');
        }
    }

    getStateTransitions(currPosition) {
        throw new Error('Abstract method must be implemented in subclass.')
    }
};

export default Searchable;