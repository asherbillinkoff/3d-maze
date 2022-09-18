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

  allWalls() {
    for (const direction of this.walls) {
      this.#walls.set(direction, true);
    }
  } 

  addWall(direction, boolean) {
    this.#walls.set(direction, boolean);
  }

  removeWall(direction) {
    this.#walls.delete(direction);
  }
}

export default Cell;