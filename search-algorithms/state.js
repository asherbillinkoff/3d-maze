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