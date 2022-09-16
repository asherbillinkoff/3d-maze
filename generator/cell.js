class Cell {
  /** @type {Map<Number, Boolean>} */
  #walls
  #position

  constructor(z, y, x) {
    // Positions in this map will correspond to ('l', 'r', 'f', 'b', 'u', 'd') => (left, right, forward (top of page), backward (bottom of page), up, down)
    this.#walls = new Map();          // Keys = directions above, Values = wall status boolean
    this.#position = [z, y, x];
  }

  get walls() {
    return this.#walls.values();
  }

  addWall(direction, boolean) {
    his.#walls.set(direction, boolean);
  }

  removeWall(direction) {
    this.#walls.delete(direction);
  }

  getNeighbors(value) {
    const node = this.#nodes.get(value);
    if (node) {
      return node.neighbors;
    }
  }
}

export default Cell;