
/**
 * @classdesc Abstract class for the state object which stores the state of a
 * puzzle while evaluating future moves to be made. These states are later included
 * within a Node object.
 */
class State {
    #key
    constructor(key) {
        if (this.constructor === State) {
          throw new Error('State cannot be initialized');
        }
        this.#key = key;
    }
    get key() {
        return this.#key;
    }
    equals(other) {
        return other instanceof State && this.#key === other.#key;
    }
};

export default State;